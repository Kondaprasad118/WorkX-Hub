const express = require('express');
const cors = require('cors');
const path = require('path');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('./db/db-helper');
const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = 'workxhub_super_secret_jwt_key_2026';
app.use(cors());
app.use(express.json());
// Serve static frontend files from 'public'
app.use(express.static(path.join(__dirname, 'public')));
// Middleware to verify JWT token
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Access token required' });
    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ error: 'Invalid or expired token' });
        req.user = user;
        next();
    });
}
// Middleware to check if user is Admin
function requireAdmin(req, res, next) {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(403).json({ error: 'Access denied: Admin privileges required' });
    }
}
// --- AUTHENTICATION ENDPOINTS ---
// Register Homeowner
app.post('/api/auth/register-homeowner', (req, res) => {
    const { email, password, name, phone, address } = req.body;
    if (!email || !password || !name) {
        return res.status(400).json({ error: 'Missing required fields' });
    }
    const existingUser = db.findOne('users', u => u.email.toLowerCase() === email.toLowerCase());
    if (existingUser) {
        return res.status(400).json({ error: 'Email already registered' });
    }
    const hashedPassword = bcrypt.hashSync(password, 10);
    const newUser = db.insert('users', {
        email: email.toLowerCase(),
        password: hashedPassword,
        role: 'homeowner',
        name,
        phone: phone || '',
        address: address || ''
    });
    // Generate JWT Token
    const token = jwt.sign(
        { id: newUser.id, email: newUser.email, role: newUser.role, name: newUser.name },
        JWT_SECRET,
        { expiresIn: '24h' }
    );
    res.status(201).json({
        message: 'Homeowner registered successfully',
        token,
        user: { id: newUser.id, email: newUser.email, role: newUser.role, name: newUser.name }
    });
});
// Register Worker
app.post('/api/auth/register-worker', (req, res) => {
    const { email, password, name, phone, address, category, experience, hourlyRate, bio, skills } = req.body;
    if (!email || !password || !name || !category || !hourlyRate) {
        return res.status(400).json({ error: 'Missing required fields' });
    }
    const existingUser = db.findOne('users', u => u.email.toLowerCase() === email.toLowerCase());
    if (existingUser) {
        return res.status(400).json({ error: 'Email already registered' });
    }
    const hashedPassword = bcrypt.hashSync(password, 10);
    const newUser = db.insert('users', {
        email: email.toLowerCase(),
        password: hashedPassword,
        role: 'worker',
        name,
        phone: phone || '',
        address: address || ''
    });
    const parsedSkills = Array.isArray(skills)
        ? skills
        : typeof skills === 'string'
            ? skills.split(',').map(s => s.trim()).filter(Boolean)
            : [];
    const newWorker = db.insert('workers', {
        userId: newUser.id,
        category,
        experience: parseInt(experience) || 0,
        hourlyRate: parseFloat(hourlyRate),
        bio: bio || '',
        skills: parsedSkills,
        rating: 5.0,
        reviewsCount: 0,
        availability: 'available',
        profileImage: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=150&auto=format&fit=crop&q=80', // Default professional avatar
        verificationStatus: 'pending' // Needs Admin approval
    });
    const token = jwt.sign(
        { id: newUser.id, email: newUser.email, role: newUser.role, name: newUser.name },
        JWT_SECRET,
        { expiresIn: '24h' }
    );
    res.status(201).json({
        message: 'Worker registered successfully. Awaiting admin verification.',
        token,
        user: { id: newUser.id, email: newUser.email, role: newUser.role, name: newUser.name },
        worker: newWorker
    });
});
// Login User
app.post('/api/auth/login', (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password required' });
    }
    const user = db.findOne('users', u => u.email.toLowerCase() === email.toLowerCase());
    if (!user || !bcrypt.compareSync(password, user.password)) {
        return res.status(401).json({ error: 'Invalid email or password' });
    }
    const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role, name: user.name },
        JWT_SECRET,
        { expiresIn: '24h' }
    );
    res.json({
        message: 'Login successful',
        token,
        user: { id: user.id, email: user.email, role: user.role, name: user.name }
    });
});
// Get Current User Profile
app.get('/api/auth/me', authenticateToken, (req, res) => {
    const user = db.findOne('users', u => u.id === req.user.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    const userData = {
        id: user.id,
        email: user.email,
        role: user.role,
        name: user.name,
        phone: user.phone,
        address: user.address,
        createdAt: user.createdAt
    };
    if (user.role === 'worker') {
        const workerProfile = db.findOne('workers', w => w.userId === user.id);
        userData.workerProfile = workerProfile;
    }
    res.json(userData);
});
// --- WORKER DIRECTORY ENDPOINTS ---
// Get all workers (with filters)
app.get('/api/workers', (req, res) => {
    const { category, search } = req.query;
    let workers = db.find('workers', w => w.verificationStatus === 'verified');
    const users = db.find('users', u => u.role === 'worker');
    // Merge user names and contact info into worker listings
    let results = workers.map(worker => {
        const user = users.find(u => u.id === worker.userId);
        return {
            ...worker,
            name: user ? user.name : 'Unknown Worker',
            phone: user ? user.phone : '',
            address: user ? user.address : ''
        };
    });
    // Apply category filter
    if (category && category !== 'All') {
        results = results.filter(w => w.category.toLowerCase() === category.toLowerCase());
    }
    // Apply text search (name, bio, skills)
    if (search) {
        const term = search.toLowerCase();
        results = results.filter(w =>
            w.name.toLowerCase().includes(term) ||
            w.bio.toLowerCase().includes(term) ||
            w.skills.some(s => s.toLowerCase().includes(term))
        );
    }
    res.json(results);
});
// Get specific worker profile details + reviews
app.get('/api/workers/:id', (req, res) => {
    const workerId = req.params.id; // This is the user ID of the worker
    const user = db.findOne('users', u => u.id === workerId && u.role === 'worker');
    const profile = db.findOne('workers', w => w.userId === workerId);
    if (!user || !profile) {
        return res.status(404).json({ error: 'Worker profile not found' });
    }
    // Fetch reviews from bookings table
    const bookings = db.find('bookings', b => b.workerId === workerId && b.status === 'completed' && b.rating !== null);

    const reviews = bookings.map(b => {
        const client = db.findOne('users', u => u.id === b.homeownerId);
        return {
            id: b.id,
            clientName: client ? client.name : 'Anonymous Client',
            rating: b.rating,
            review: b.review,
            date: b.updatedAt || b.createdAt
        };
    });
    res.json({
        userId: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        ...profile,
        reviews
    });
});
// --- BOOKING ENDPOINTS ---
// Get bookings (context based on user role)
app.get('/api/bookings', authenticateToken, (req, res) => {
    let bookings;

    if (req.user.role === 'homeowner') {
        bookings = db.find('bookings', b => b.homeownerId === req.user.id);
    } else if (req.user.role === 'worker') {
        bookings = db.find('bookings', b => b.workerId === req.user.id);
    } else if (req.user.role === 'admin') {
        bookings = db.find('bookings');
    } else {
        return res.status(403).json({ error: 'Unauthorized role' });
    }
    // Sort bookings newest first
    bookings.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    // Populate related user names
    const populated = bookings.map(b => {
        const homeowner = db.findOne('users', u => u.id === b.homeownerId);
        const workerUser = db.findOne('users', u => u.id === b.workerId);
        const workerProfile = db.findOne('workers', w => w.userId === b.workerId);

        return {
            ...b,
            homeownerName: homeowner ? homeowner.name : 'Unknown Client',
            homeownerPhone: homeowner ? homeowner.phone : '',
            workerName: workerUser ? workerUser.name : 'Unknown Worker',
            workerCategory: workerProfile ? workerProfile.category : '',
            workerProfileImage: workerProfile ? workerProfile.profileImage : ''
        };
    });
    res.json(populated);
});
// Create a booking request
app.post('/api/bookings', authenticateToken, (req, res) => {
    if (req.user.role !== 'homeowner') {
        return res.status(403).json({ error: 'Only homeowners can request service bookings' });
    }
    const { workerId, date, time, address, description } = req.body;
    if (!workerId || !date || !time || !address || !description) {
        return res.status(400).json({ error: 'Missing service booking details' });
    }
    const workerUser = db.findOne('users', u => u.id === workerId && u.role === 'worker');
    const workerProfile = db.findOne('workers', w => w.userId === workerId);
    if (!workerUser || !workerProfile) {
        return res.status(404).json({ error: 'Worker not found' });
    }
    // Calculate estimated price based on 2-hour minimum or simple estimate
    const estimatedHours = 2;
    const paymentAmount = workerProfile.hourlyRate * estimatedHours;
    const newBooking = db.insert('bookings', {
        homeownerId: req.user.id,
        workerId,
        category: workerProfile.category,
        date,
        time,
        address,
        description,
        status: 'pending',
        paymentStatus: 'unpaid',
        paymentAmount,
        paymentId: '',
        rating: null,
        review: ''
    });
    res.status(201).json({
        message: 'Booking request sent successfully',
        booking: newBooking
    });
});
// Update booking status (accept, reject, complete, cancel)
app.put('/api/bookings/:id/status', authenticateToken, (req, res) => {
    const bookingId = req.params.id;
    const { status } = req.body;
    if (!['accepted', 'rejected', 'completed', 'cancelled'].includes(status)) {
        return res.status(400).json({ error: 'Invalid status update' });
    }
    const booking = db.findOne('bookings', b => b.id === bookingId);
    if (!booking) {
        return res.status(404).json({ error: 'Booking not found' });
    }
    // Auth Checks
    // Workers can accept, reject, complete
    // Homeowners can cancel
    if (req.user.role === 'worker') {
        if (booking.workerId !== req.user.id) {
            return res.status(403).json({ error: 'Unauthorized booking operation' });
        }
        if (status === 'cancelled') {
            return res.status(400).json({ error: 'Workers cannot cancel bookings' });
        }
    } else if (req.user.role === 'homeowner') {
        if (booking.homeownerId !== req.user.id) {
            return res.status(403).json({ error: 'Unauthorized booking operation' });
        }
        if (status !== 'cancelled') {
            return res.status(400).json({ error: 'Homeowners can only cancel bookings' });
        }
    } else if (req.user.role !== 'admin') {
        return res.status(403).json({ error: 'Access denied' });
    }
    // Check state transitions
    if (booking.status === 'completed' || booking.status === 'cancelled') {
        return res.status(400).json({ error: 'Cannot change status of a finished booking' });
    }
    const updated = db.update('bookings', b => b.id === bookingId, { status });
    res.json({
        message: `Booking status updated to ${status}`,
        booking: updated[0]
    });
});
// Submit booking review & rating
app.post('/api/bookings/:id/review', authenticateToken, (req, res) => {
    if (req.user.role !== 'homeowner') {
        return res.status(403).json({ error: 'Only homeowners can submit reviews' });
    }
    const bookingId = req.params.id;
    const { rating, review } = req.body;
    if (!rating || rating < 1 || rating > 5) {
        return res.status(400).json({ error: 'Rating must be an integer between 1 and 5' });
    }
    const booking = db.findOne('bookings', b => b.id === bookingId);

    if (!booking || booking.homeownerId !== req.user.id) {
        return res.status(404).json({ error: 'Booking not found or unauthorized' });
    }
    if (booking.status !== 'completed') {
        return res.status(400).json({ error: 'Reviews can only be left for completed bookings' });
    }
    if (booking.rating !== null) {
        return res.status(400).json({ error: 'Review has already been submitted for this service' });
    }
    // Submit review in booking record
    const updatedBooking = db.update('bookings', b => b.id === bookingId, {
        rating: parseInt(rating),
        review: review || ''
    })[0];
    // Update Worker's rating averages
    const workerProfile = db.findOne('workers', w => w.userId === booking.workerId);
    if (workerProfile) {
        const allCompletedWithReviews = db.find('bookings', b => b.workerId === booking.workerId && b.status === 'completed' && b.rating !== null);
        const totalRating = allCompletedWithReviews.reduce((sum, b) => sum + b.rating, 0);
        const newAverage = parseFloat((totalRating / allCompletedWithReviews.length).toFixed(1));
        db.update('workers', w => w.userId === booking.workerId, {
            rating: newAverage,
            reviewsCount: allCompletedWithReviews.length
        });
    }
    res.json({
        message: 'Review submitted successfully',
        booking: updatedBooking
    });
});
// --- MOCK PAYMENT ENDPOINT ---
app.post('/api/payments/checkout', authenticateToken, (req, res) => {
    const { bookingId, cardName, cardNumber, expiry, cvv } = req.body;
    if (!bookingId || !cardName || !cardNumber || !expiry || !cvv) {
        return res.status(400).json({ error: 'Missing checkout payment fields' });
    }
    const booking = db.findOne('bookings', b => b.id === bookingId);
    if (!booking) {
        return res.status(404).json({ error: 'Booking invoice not found' });
    }
    if (booking.paymentStatus === 'paid') {
        return res.status(400).json({ error: 'Invoice has already been paid' });
    }
    // Simple mock processing delay & success
    const mockPaymentId = 'pay_' + Math.random().toString(36).substr(2, 9);

    db.update('bookings', b => b.id === bookingId, {
        paymentStatus: 'paid',
        paymentId: mockPaymentId
    });
    res.json({
        message: 'Payment processed successfully',
        paymentId: mockPaymentId
    });
});
// --- BLOG & CONTACT ENDPOINTS ---
// Get Blogs
app.get('/api/blogs', (req, res) => {
    const blogs = db.find('blogs');
    // Sort blogs newest first
    blogs.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    res.json(blogs);
});
// Get single blog post by slug
app.get('/api/blogs/:slug', (req, res) => {
    const blog = db.findOne('blogs', b => b.slug === req.params.slug);
    if (!blog) return res.status(404).json({ error: 'Blog post not found' });
    res.json(blog);
});
// Contact Us form submission
app.post('/api/contacts', (req, res) => {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !subject || !message) {
        return res.status(400).json({ error: 'All message fields are required' });
    }
    const newContact = db.insert('contacts', {
        name,
        email,
        subject,
        message,
        status: 'unread'
    });
    res.status(201).json({
        message: 'Message submitted successfully. We will get back to you shortly.',
        contact: newContact
    });
});
// --- ADMIN SYSTEM ENDPOINTS ---
// Admin overview analytics
app.get('/api/admin/stats', authenticateToken, requireAdmin, (req, res) => {
    const bookings = db.find('bookings');
    const users = db.find('users');
    const workers = db.find('workers');
    const contacts = db.find('contacts');
    const totalEarnings = bookings
        .filter(b => b.paymentStatus === 'paid')
        .reduce((sum, b) => sum + b.paymentAmount, 0);
    const stats = {
        bookingsCount: bookings.length,
        usersCount: users.length,
        workersCount: workers.length,
        homeownersCount: users.filter(u => u.role === 'homeowner').length,
        totalEarnings,
        pendingApprovals: workers.filter(w => w.verificationStatus === 'pending').length,
        unreadMessages: contacts.filter(c => c.status === 'unread').length
    };
    res.json(stats);
});
// Admin get users listing
app.get('/api/admin/users', authenticateToken, requireAdmin, (req, res) => {
    const users = db.find('users');
    const workers = db.find('workers');
    const detailedUsers = users.map(user => {
        const data = {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
            phone: user.phone,
            address: user.address,
            createdAt: user.createdAt
        };
        if (user.role === 'worker') {
            const wProfile = workers.find(w => w.userId === user.id);
            if (wProfile) {
                data.workerProfile = wProfile;
            }
        }
        return data;
    });
    res.json(detailedUsers);
});
// Admin verify worker account
app.put('/api/admin/verify-worker', authenticateToken, requireAdmin, (req, res) => {
    const { workerUserId, status } = req.body; // status = 'verified' | 'rejected'
    if (!workerUserId || !['verified', 'rejected'].includes(status)) {
        return res.status(400).json({ error: 'Invalid worker ID or status' });
    }
    const worker = db.findOne('workers', w => w.userId === workerUserId);
    if (!worker) {
        return res.status(404).json({ error: 'Worker profile not found' });
    }
    db.update('workers', w => w.userId === workerUserId, {
        verificationStatus: status
    });
    res.json({
        message: `Worker verification status updated to: ${status}`
    });
});
// Admin retrieve messages
app.get('/api/admin/contacts', authenticateToken, requireAdmin, (req, res) => {
    const contacts = db.find('contacts');
    contacts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    res.json(contacts);
});
// Admin update message status (read)
app.put('/api/admin/contacts/:id/read', authenticateToken, requireAdmin, (req, res) => {
    const contactId = req.params.id;
    db.update('contacts', c => c.id === contactId, { status: 'read' });
    res.json({ message: 'Message marked as read' });
});
// Wildcard fallback: Serve index.html for all client routing requests (enables SPA routing fallback)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
app.listen(PORT, () => {
    console.log(`===============================================`);
    console.log(` WorkX Hub Server running on http://localhost:${PORT}`);
    console.log(` Ready to host local marketplace services!`);
    console.log(`===============================================`);
});