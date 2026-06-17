import { store } from './store.js';
// Seed data to initialize localStorage if Node backend is offline
const DEFAULT_SEED_DATA = {
    users: [
        { id: "usr_admin", email: "admin@workxhub.com", password: "admin123", role: "admin", name: "Super Admin", phone: "+1 555-0100", address: "WorkX Hub HQ, Seattle, WA", createdAt: new Date().toISOString() },
        { id: "usr_homeowner1", email: "jane@example.com", password: "password123", role: "homeowner", name: "Jane Doe", phone: "+1 555-0101", address: "123 Maple St, Seattle, WA 98101", createdAt: new Date().toISOString() },
        { id: "usr_homeowner2", email: "bob@example.com", password: "password123", role: "homeowner", name: "Bob Smith", phone: "+1 555-0102", address: "456 Oak Ave, Tacoma, WA 98402", createdAt: new Date().toISOString() },
        { id: "usr_homeowner3", email: "alice@example.com", password: "password123", role: "homeowner", name: "Alice Johnson", phone: "+1 555-0103", address: "789 Pine Rd, Bellevue, WA 98004", createdAt: new Date().toISOString() },
        { id: "usr_worker1", email: "plumber@workxhub.com", password: "password123", role: "worker", name: "John Miller", phone: "+1 555-0201", address: "101 Cedar St, Seattle, WA 98103", createdAt: new Date().toISOString() },
        { id: "usr_worker2", email: "electrician@workxhub.com", password: "password123", role: "worker", name: "Sarah Sparks", phone: "+1 555-0202", address: "202 Birch Blvd, Seattle, WA 98105", createdAt: new Date().toISOString() },
        { id: "usr_worker3", email: "carpenter@workxhub.com", password: "password123", role: "worker", name: "David Wood", phone: "+1 555-0203", address: "303 Elm Rd, Tacoma, WA 98405", createdAt: new Date().toISOString() },
        { id: "usr_worker4", email: "painter@workxhub.com", password: "password123", role: "worker", name: "Elena Rostova", phone: "+1 555-0204", address: "404 Walnut St, Bellevue, WA 98005", createdAt: new Date().toISOString() },
        { id: "usr_worker5", email: "driver@workxhub.com", password: "password123", role: "worker", name: "Marcus Speed", phone: "+1 555-0205", address: "505 Ash Way, Seattle, WA 98109", createdAt: new Date().toISOString() },
        { id: "usr_worker6", email: "ac@workxhub.com", password: "password123", role: "worker", name: "Robert Chill", phone: "+1 555-0206", address: "606 Pine Pl, Renton, WA 98057", createdAt: new Date().toISOString() },
        { id: "usr_worker7", email: "appliance@workxhub.com", password: "password123", role: "worker", name: "Thomas Fixer", phone: "+1 555-0207", address: "707 Spruce Ave, Kent, WA 98030", createdAt: new Date().toISOString() },
        { id: "usr_worker8", email: "cleaner@workxhub.com", password: "password123", role: "worker", name: "Maria Clean", phone: "+1 555-0208", address: "808 Fir Dr, Everett, WA 98201", createdAt: new Date().toISOString() },
        { id: "usr_worker9", email: "gardener@workxhub.com", password: "password123", role: "worker", name: "Oliver Green", phone: "+1 555-0209", address: "909 Alder St, Redmond, WA 98052", createdAt: new Date().toISOString() },
        { id: "usr_worker10", email: "pest@workxhub.com", password: "password123", role: "worker", name: "Alan Hunter", phone: "+1 555-0210", address: "110 Cypress Ct, Seattle, WA 98122", createdAt: new Date().toISOString() }
    ],
    workers: [
        { userId: "usr_worker1", category: "Plumber", experience: 8, hourlyRate: 50, bio: "Licensed plumber with 8 years of experience. Specializing in leak repair, drain cleaning, water heaters, and pipe fitting.", skills: ["Leak Repair", "Drain Cleaning", "Water Heaters", "Pipe Fitting"], rating: 4.9, reviewsCount: 24, availability: "available", profileImage: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80", verificationStatus: "verified" },
        { userId: "usr_worker2", category: "Electrician", experience: 6, hourlyRate: 60, bio: "Certified residential electrician. Expert in smart home installations, panel upgrades, rewiring, and troubleshooting.", skills: ["Panel Upgrades", "Smart Home Installation", "Rewiring", "Fixture Installation"], rating: 4.8, reviewsCount: 18, availability: "available", profileImage: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80", verificationStatus: "verified" },
        { userId: "usr_worker3", category: "Carpenter", experience: 12, hourlyRate: 45, bio: "Master craftsman specializing in custom woodworking, furniture repair, deck building, and cabinet installation.", skills: ["Custom Furniture", "Deck Building", "Cabinet Install", "Wood Repair"], rating: 5.0, reviewsCount: 15, availability: "available", profileImage: "https://images.unsplash.com/photo-1620122303020-43ec4b6cf7f8?w=150&auto=format&fit=crop&q=80", verificationStatus: "verified" },
        { userId: "usr_worker4", category: "Painter", experience: 5, hourlyRate: 35, bio: "Professional interior and exterior painter. Precision drywall patching, wallpaper removal, and color consultation.", skills: ["Interior Painting", "Exterior Painting", "Drywall Patching", "Wallpaper Removal"], rating: 4.7, reviewsCount: 20, availability: "busy", profileImage: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80", verificationStatus: "verified" },
        { userId: "usr_worker5", category: "Driver", experience: 10, hourlyRate: 25, bio: "Professional and courteous personal driver. Available for errands, airport transfers, and long-distance trips.", skills: ["Airport Transfers", "Errands", "Long Distance", "Navigational Skills"], rating: 4.9, reviewsCount: 30, availability: "available", profileImage: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80", verificationStatus: "verified" },
        { userId: "usr_worker6", category: "AC Technician", experience: 7, hourlyRate: 55, bio: "Certified HVAC and AC specialist. Expert in cooling system installations, seasonal maintenance, and repairs.", skills: ["AC Installation", "HVAC Maintenance", "Refrigerant Refills", "Compressor Repair"], rating: 4.6, reviewsCount: 14, availability: "available", profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80", verificationStatus: "verified" },
        { userId: "usr_worker7", category: "Appliance Repair", experience: 9, hourlyRate: 40, bio: "Expert technician for all major home appliances. Specializing in fixing refrigerators, washers, dryers, and dishwashers.", skills: ["Refrigerator Fix", "Washer & Dryer", "Dishwashers", "Ovens & Stoves"], rating: 4.8, reviewsCount: 22, availability: "available", profileImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80", verificationStatus: "verified" },
        { userId: "usr_worker8", category: "House Cleaner", experience: 4, hourlyRate: 30, bio: "Detail-oriented house cleaner. Offering deep cleaning, standard weekly tidy ups, and move-in/out cleanups.", skills: ["Deep Cleaning", "Standard Tidy Up", "Move-in/Move-out", "Organizing"], rating: 4.9, reviewsCount: 42, availability: "available", profileImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80", verificationStatus: "verified" },
        { userId: "usr_worker9", category: "Gardener", experience: 6, hourlyRate: 35, bio: "Professional landscape gardener. Lawn care, hedge trimming, flowerbed design, and weed management.", skills: ["Lawn Mowing", "Hedge Trimming", "Flowerbed Design", "Weeding"], rating: 4.8, reviewsCount: 16, availability: "available", profileImage: "https://images.unsplash.com/photo-1607990283143-e81e7a2c93ab?w=150&auto=format&fit=crop&q=80", verificationStatus: "verified" },
        { userId: "usr_worker10", category: "Pest Control", experience: 5, hourlyRate: 45, bio: "Licensed pest extermination technician. Effective treatments for ants, rodents, spiders, and wasps.", skills: ["Ant Treatments", "Rodent Control", "Spider Spraying", "Wasp Nest Removal"], rating: 4.7, reviewsCount: 11, availability: "offline", profileImage: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80", verificationStatus: "pending" }
    ],
    bookings: [
        { id: "bk_seed1", homeownerId: "usr_homeowner1", workerId: "usr_worker1", category: "Plumber", date: "2026-06-10", time: "09:00 AM", address: "123 Maple St, Seattle, WA 98101", description: "Repairing a leaky faucet under the kitchen sink. Water has started leaking into the cabinet.", status: "completed", paymentStatus: "paid", paymentAmount: 100.00, paymentId: "pay_seed1", rating: 5, review: "John arrived right on time, diagnosed the issue quickly, and fixed it perfectly. He also cleaned up everything afterwards. Very professional!", createdAt: "2026-06-08T10:00:00Z", updatedAt: "2026-06-10T11:00:00Z" },
        { id: "bk_seed2", homeownerId: "usr_homeowner2", workerId: "usr_worker2", category: "Electrician", date: "2026-06-12", time: "02:00 PM", address: "456 Oak Ave, Tacoma, WA 98402", description: "Installing smart dimmers in the living room and checking a faulty outlet in the garage.", status: "completed", paymentStatus: "paid", paymentAmount: 180.00, paymentId: "pay_seed2", rating: 4, review: "Sarah did a great job installing the dimmers. She was very thorough and safe.", createdAt: "2026-06-10T14:30:00Z", updatedAt: "2026-06-12T16:00:00Z" },
        { id: "bk_seed3", homeownerId: "usr_homeowner1", workerId: "usr_worker3", category: "Carpenter", date: "2026-06-18", time: "11:00 AM", address: "123 Maple St, Seattle, WA 98101", description: "Repairing two broken steps on the wooden deck in the backyard and reinforcing the handrail.", status: "accepted", paymentStatus: "unpaid", paymentAmount: 135.00, paymentId: "", rating: null, review: "", createdAt: "2026-06-14T09:15:00Z" },
        { id: "bk_seed4", homeownerId: "usr_homeowner3", workerId: "usr_worker8", category: "House Cleaner", date: "2026-06-19", time: "10:00 AM", address: "789 Pine Rd, Bellevue, WA 98004", description: "Standard house cleaning, 3 bedrooms, 2 bathrooms. Focus on dusting and vacuuming.", status: "pending", paymentStatus: "unpaid", paymentAmount: 120.00, paymentId: "", rating: null, review: "", createdAt: "2026-06-15T08:00:00Z" }
    ],
    blogs: [
        { id: "blog_1", title: "5 Plumbing Red Flags Homeowners Should Never Ignore", slug: "plumbing-red-flags", excerpt: "From small drips to low water pressure, some minor issues can be signs of major plumbing disasters. Read this before a leak becomes a flood.", content: "<h3>1. Persistent Leaking Faucets</h3><p>While a dripping faucet may seem like just an annoying sound, it can waste hundreds of gallons of water per year. More importantly, it is often a sign of high water pressure or damaged washers, which can eventually lead to pipe failure.</p><h3>2. Low Water Pressure</h3><p>If water is trickling out of your shower or sink, you might have a buildup of sediment, a hidden leak, or cracked pipes. Don't ignore it—hidden leaks can rot your walls and promote toxic mold growth.</p><h3>3. Gurgling Sounds</h3><p>If your toilet or sink gurgles when you run water elsewhere, your drainage system is struggling to vent air. This points to a severe clog deep in your line, which could lead to sewage backing up into your fixtures.</p><h3>4. Unexplained Water Puddles</h3><p>If you see damp spots on drywall or pooling water in your yard, you likely have a burst pipe or a slab leak. Turn off your main water valve immediately and call a certified plumber.</p><h3>5. Discolored Water</h3><p>Yellow, brown, or rusty water indicates that your pipes are corroding internally, or that your hot water heater is rusting out. This needs professional replacement before the tank bursts.</p>", author: "Robert Miller, Master Plumber", category: "Plumbing", readTime: "5 min read", image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&auto=format&fit=crop&q=80", createdAt: "2026-06-05T09:00:00Z" },
        { id: "blog_2", title: "How to Safely Troubleshoot Minor Electrical Issues", slug: "electrical-safety-troubleshooting", excerpt: "Electricity is powerful and dangerous. Learn what minor checks you can perform safely at home, and when it is absolutely vital to call a licensed electrician.", content: "<h3>Safety First: The Golden Rule</h3><p>Before touching anything electrical, ALWAYS shut off the power at the main breaker panel. Use a non-contact voltage tester to verify there is absolutely no active current.</p><h3>1. The Tripped Circuit Breaker</h3><p>If an outlet or light suddenly stops working, check your breaker panel. A tripped breaker will be resting in the middle position. Turn it fully OFF, then back to ON. If it trips again immediately, do not force it—this indicates a dangerous short circuit or overloaded line. Call an electrician.</p><h3>2. The Warm Wall Switch</h3><p>If a light switch or outlet feels warm to the touch, turn it off immediately. Warmth indicates overloading or failing wiring behind the plate, which is a major fire hazard.</p><h3>3. Flickering Lights</h3><p>Flickering is often caused by a loose bulb, but if multiple lights flicker across a room, it points to loose service wiring in your main panel or floating neutral connections. This requires a professional to tighten and inspect.</p><h3>4. GFCI Outlets That Won't Reset</h3><p>Ground Fault Circuit Interrupter (GFCI) outlets protect you from shock in wet areas. If it trips and refuses to reset, the outlet is either faulty, or there is an active ground fault in the wiring. Leave it alone and call a pro.</p>", author: "Sarah Sparks, Certified Electrician", category: "Electrical", readTime: "6 min read", image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800&auto=format&fit=crop&q=80", createdAt: "2026-06-08T11:30:00Z" },
        { id: "blog_3", title: "Essential Summer Maintenance for Your Home Air Conditioner", slug: "summer-ac-maintenance", excerpt: "Keep your house cool and reduce your electricity bill by 15% with these simple, step-by-step DIY air conditioning maintenance tips.", content: "<h3>1. Change the Air Filters</h3><p>A dirty filter blocks airflow, forcing your AC unit to work twice as hard. Replace or wash your AC filters every 30 to 90 days. This simple action can lower your system's energy consumption by up to 15%.</p><h3>2. Clean the Condenser Coils</h3><p>The outdoor condenser unit accumulates dirt, leaves, and grass clippings. Shut off the power, and use a garden hose to gently spray down the coils from the inside out. Do not use a pressure washer, as it can bend the delicate aluminum fins.</p><h3>3. Clear the Condensate Drain Line</h3><p>Algae and mold can clog the drain line, causing water to back up and flood your home. Pour a cup of household bleach or white vinegar down the access port to kill any buildup and keep the line flowing.</p><h3>4. Check Vent Clearance</h3><p>Make sure furniture, curtains, and rugs are not blocking supply or return vents. Unobstructed air circulation is critical for efficient cooling.</p><h3>5. When to Call an AC Tech</h3><p>If your AC runs constantly but blows warm air, or if you hear grinding sounds, it is likely low on refrigerant or has a compressor issue. These require certified HVAC technicians to service safely.</p>", author: "Robert Chill, AC Specialist", category: "AC Repair", readTime: "4 min read", image: "https://images.unsplash.com/photo-1621905252507-b354bc25edac?w=800&auto=format&fit=crop&q=80", createdAt: "2026-06-12T14:00:00Z" }
    ],
    contacts: [
        { id: "ct_seed1", name: "Marcus Aurelius", email: "marcus@rome.org", subject: "Pest Control corporate account", message: "Hello, we are interested in setting up monthly pest control contracts for our three office locations in downtown Seattle.", status: "unread", createdAt: "2026-06-14T16:40:00Z" }
    ]
};
class APIClient {
    constructor() {
        this.baseUrl = window.location.origin;
        this.useMock = false;
        // Detect if running directly from file:// protocol (always mock)
        if (window.location.protocol === 'file:') {
            this.useMock = true;
            console.log('Running from file protocol. Enabling client-side LocalStorage database.');
        }
        this.initMockDb();
    }
    // Initialize mock database in localStorage
    initMockDb() {
        if (!localStorage.getItem('workxhub_db')) {
            localStorage.setItem('workxhub_db', JSON.stringify(DEFAULT_SEED_DATA));
            console.log('Mock database initialized in LocalStorage.');
        }
    }
    // Read mock database
    getMockDb() {
        this.initMockDb();
        return JSON.parse(localStorage.getItem('workxhub_db'));
    }
    // Save mock database
    saveMockDb(db) {
        localStorage.setItem('workxhub_db', JSON.stringify(db));
    }
    // Core Request Coordinator
    async request(method, endpoint, body = null) {
        if (this.useMock) {
            return this.handleMockRequest(method, endpoint, body);
        }
        try {
            const headers = {
                'Content-Type': 'application/json'
            };

            const token = store.getToken();
            if (token) {
                headers['Authorization'] = `Bearer ${token}`;
            }
            const config = {
                method,
                headers
            };
            if (body && (method === 'POST' || method === 'PUT')) {
                config.body = JSON.stringify(body);
            }
            const response = await fetch(`${this.baseUrl}/api${endpoint}`, config);

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || `HTTP error! Status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            // Fallback if Express backend is down or connection refused
            if (error instanceof TypeError || error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
                console.warn(`Connection to Express API failed. Switching to LocalStorage mock database. Error details:`, error);
                this.useMock = true;
                return this.handleMockRequest(method, endpoint, body);
            }
            throw error;
        }
    }
    // GET helper
    async get(endpoint) {
        return this.request('GET', endpoint);
    }
    // POST helper
    async post(endpoint, body) {
        return this.request('POST', endpoint, body);
    }
    // PUT helper
    async put(endpoint, body) {
        return this.request('PUT', endpoint, body);
    }
    // --- LOCALSTORAGE MOCK ROUTER (Matches Server.js API Schema) ---
    handleMockRequest(method, endpoint, body) {
        console.log(`[API Mock] ${method} ${endpoint}`, body);
        const db = this.getMockDb();

        // Auth Token verification simulator
        let currentUser = null;
        const token = store.getToken();
        if (token) {
            // Find user matching mock token string (we'll just use user ID as the token for convenience)
            currentUser = db.users.find(u => u.id === token);
        }
        // Helper functions for mock responses
        const unauthorized = () => { throw new Error('Access token required or invalid'); };
        const forbidden = () => { throw new Error('Access denied'); };
        const notFound = (msg = 'Resource not found') => { throw new Error(msg); };
        const badRequest = (msg = 'Bad request') => { throw new Error(msg); };
        // 1. POST /auth/register-homeowner
        if (method === 'POST' && endpoint === '/auth/register-homeowner') {
            const { email, password, name, phone, address } = body;
            if (!email || !password || !name) return badRequest('Missing required fields');

            const existing = db.users.find(u => u.email.toLowerCase() === email.toLowerCase());
            if (existing) return badRequest('Email already registered');
            const newUser = {
                id: 'usr_' + Math.random().toString(36).substr(2, 9),
                email: email.toLowerCase(),
                password: password, // Store password
                role: 'homeowner',
                name,
                phone: phone || '',
                address: address || '',
                createdAt: new Date().toISOString()
            };
            db.users.push(newUser);
            this.saveMockDb(db);
            return {
                message: 'Homeowner registered successfully (Mock)',
                token: newUser.id, // User ID serves as the Mock session token
                user: { id: newUser.id, email: newUser.email, role: newUser.role, name: newUser.name }
            };
        }
        // 2. POST /auth/register-worker
        if (method === 'POST' && endpoint === '/auth/register-worker') {
            const { email, password, name, phone, address, category, experience, hourlyRate, bio, skills } = body;
            if (!email || !password || !name || !category || !hourlyRate) return badRequest('Missing required fields');
            const existing = db.users.find(u => u.email.toLowerCase() === email.toLowerCase());
            if (existing) return badRequest('Email already registered');
            const newUser = {
                id: 'usr_' + Math.random().toString(36).substr(2, 9),
                email: email.toLowerCase(),
                password: password,
                role: 'worker',
                name,
                phone: phone || '',
                address: address || '',
                createdAt: new Date().toISOString()
            };
            const parsedSkills = Array.isArray(skills)
                ? skills
                : typeof skills === 'string'
                    ? skills.split(',').map(s => s.trim()).filter(Boolean)
                    : [];
            const newWorker = {
                userId: newUser.id,
                category,
                experience: parseInt(experience) || 0,
                hourlyRate: parseFloat(hourlyRate),
                bio: bio || '',
                skills: parsedSkills,
                rating: 5.0,
                reviewsCount: 0,
                availability: 'available',
                profileImage: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=150&auto=format&fit=crop&q=80',
                verificationStatus: 'pending'
            };
            db.users.push(newUser);
            db.workers.push(newWorker);
            this.saveMockDb(db);
            return {
                message: 'Worker registered successfully. Awaiting admin verification. (Mock)',
                token: newUser.id,
                user: { id: newUser.id, email: newUser.email, role: newUser.role, name: newUser.name },
                worker: newWorker
            };
        }
        // 3. POST /auth/login
        if (method === 'POST' && endpoint === '/auth/login') {
            const { email, password } = body;
            if (!email || !password) return badRequest('Email and password required');
            const user = db.users.find(u => u.email.toLowerCase() === email.toLowerCase());

            // Seed users use password123 or admin123.
            const isValidPassword = user && (user.password === password ||
                (user.email === 'admin@workxhub.com' && password === 'admin123') ||
                (user.email !== 'admin@workxhub.com' && password === 'password123'));
            if (!user || !isValidPassword) {
                return badRequest('Invalid email or password');
            }
            return {
                message: 'Login successful (Mock)',
                token: user.id,
                user: { id: user.id, email: user.email, role: user.role, name: user.name }
            };
        }
        // 4. GET /auth/me
        if (method === 'GET' && endpoint === '/auth/me') {
            if (!currentUser) return unauthorized();

            const userData = { ...currentUser };
            delete userData.password;
            if (currentUser.role === 'worker') {
                userData.workerProfile = db.workers.find(w => w.userId === currentUser.id);
            }
            return userData;
        }
        // 5. GET /workers
        if (method === 'GET' && endpoint.startsWith('/workers')) {
            // Parse query parameters
            const url = new URL(endpoint, 'http://dummy.com');
            const category = url.searchParams.get('category');
            const search = url.searchParams.get('search');
            // Check if details of specific worker is requested
            const pathParts = url.pathname.split('/');
            if (pathParts.length === 3 && pathParts[2] !== '') {
                const workerId = pathParts[2];
                const user = db.users.find(u => u.id === workerId && u.role === 'worker');
                const profile = db.workers.find(w => w.userId === workerId);
                if (!user || !profile) return notFound('Worker profile not found');
                // Get reviews
                const completedBookings = db.bookings.filter(b => b.workerId === workerId && b.status === 'completed' && b.rating !== null);
                const reviews = completedBookings.map(b => {
                    const client = db.users.find(u => u.id === b.homeownerId);
                    return {
                        id: b.id,
                        clientName: client ? client.name : 'Anonymous Client',
                        rating: b.rating,
                        review: b.review,
                        date: b.updatedAt || b.createdAt
                    };
                });
                return {
                    userId: user.id,
                    name: user.name,
                    email: user.email,
                    phone: user.phone,
                    address: user.address,
                    ...profile,
                    reviews
                };
            }
            // Return list of verified workers
            let activeWorkers = db.workers.filter(w => w.verificationStatus === 'verified');

            let results = activeWorkers.map(w => {
                const u = db.users.find(usr => usr.id === w.userId);
                return {
                    ...w,
                    name: u ? u.name : 'Unknown Worker',
                    phone: u ? u.phone : '',
                    address: u ? u.address : ''
                };
            });
            if (category && category !== 'All') {
                results = results.filter(w => w.category.toLowerCase() === category.toLowerCase());
            }
            if (search) {
                const term = search.toLowerCase();
                results = results.filter(w =>
                    w.name.toLowerCase().includes(term) ||
                    w.bio.toLowerCase().includes(term) ||
                    w.skills.some(s => s.toLowerCase().includes(term))
                );
            }
            return results;
        }
        // 6. GET /bookings & POST /bookings
        if (endpoint.startsWith('/bookings')) {
            if (!currentUser) return unauthorized();
            const url = new URL(endpoint, 'http://dummy.com');
            const pathParts = url.pathname.split('/');
            // Check path /bookings/:id/status or /bookings/:id/review
            if (pathParts.length === 4) {
                const bookingId = pathParts[2];
                const subAction = pathParts[3]; // 'status' or 'review'
                const bookingIndex = db.bookings.findIndex(b => b.id === bookingId);
                if (bookingIndex === -1) return notFound('Booking not found');
                const booking = db.bookings[bookingIndex];
                if (subAction === 'status' && method === 'PUT') {
                    const { status } = body;

                    if (currentUser.role === 'worker' && booking.workerId !== currentUser.id) return forbidden();
                    if (currentUser.role === 'homeowner' && booking.homeownerId !== currentUser.id) return forbidden();

                    booking.status = status;
                    booking.updatedAt = new Date().toISOString();

                    db.bookings[bookingIndex] = booking;
                    this.saveMockDb(db);
                    return { message: `Status updated to ${status}`, booking };
                }
                if (subAction === 'review' && method === 'POST') {
                    const { rating, review } = body;
                    if (currentUser.role !== 'homeowner' || booking.homeownerId !== currentUser.id) return forbidden();
                    booking.rating = parseInt(rating);
                    booking.review = review;
                    booking.updatedAt = new Date().toISOString();
                    db.bookings[bookingIndex] = booking;
                    // Re-calculate worker rating average
                    const workerIndex = db.workers.findIndex(w => w.userId === booking.workerId);
                    if (workerIndex !== -1) {
                        const workerBookings = db.bookings.filter(b => b.workerId === booking.workerId && b.status === 'completed' && b.rating !== null);
                        const total = workerBookings.reduce((sum, b) => sum + b.rating, 0);
                        db.workers[workerIndex].rating = parseFloat((total / workerBookings.length).toFixed(1));
                        db.workers[workerIndex].reviewsCount = workerBookings.length;
                    }
                    this.saveMockDb(db);
                    return { message: 'Review saved', booking };
                }
            }
            // GET /bookings
            if (method === 'GET') {
                let list = [];
                if (currentUser.role === 'homeowner') {
                    list = db.bookings.filter(b => b.homeownerId === currentUser.id);
                } else if (currentUser.role === 'worker') {
                    list = db.bookings.filter(b => b.workerId === currentUser.id);
                } else if (currentUser.role === 'admin') {
                    list = db.bookings;
                }
                list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                return list.map(b => {
                    const client = db.users.find(u => u.id === b.homeownerId);
                    const wUser = db.users.find(u => u.id === b.workerId);
                    const wProfile = db.workers.find(w => w.userId === b.workerId);
                    return {
                        ...b,
                        homeownerName: client ? client.name : 'Unknown Client',
                        homeownerPhone: client ? client.phone : '',
                        workerName: wUser ? wUser.name : 'Unknown Worker',
                        workerCategory: wProfile ? wProfile.category : '',
                        workerProfileImage: wProfile ? wProfile.profileImage : ''
                    };
                });
            }
            // POST /bookings
            if (method === 'POST') {
                if (currentUser.role !== 'homeowner') return forbidden('Only homeowners can book');
                const { workerId, date, time, address, description } = body;

                const wProfile = db.workers.find(w => w.userId === workerId);
                if (!wProfile) return notFound('Worker profile not found');
                const newBooking = {
                    id: 'bk_' + Math.random().toString(36).substr(2, 9),
                    homeownerId: currentUser.id,
                    workerId,
                    category: wProfile.category,
                    date,
                    time,
                    address,
                    description,
                    status: 'pending',
                    paymentStatus: 'unpaid',
                    paymentAmount: wProfile.hourlyRate * 2, // Estimated 2 hours
                    paymentId: '',
                    rating: null,
                    review: '',
                    createdAt: new Date().toISOString()
                };
                db.bookings.push(newBooking);
                this.saveMockDb(db);
                return { message: 'Booking created', booking: newBooking };
            }
        }
        // 7. POST /payments/checkout
        if (method === 'POST' && endpoint === '/payments/checkout') {
            if (!currentUser) return unauthorized();
            const { bookingId } = body;
            const bookingIndex = db.bookings.findIndex(b => b.id === bookingId);
            if (bookingIndex === -1) return notFound('Booking invoice not found');

            db.bookings[bookingIndex].paymentStatus = 'paid';
            db.bookings[bookingIndex].paymentId = 'pay_' + Math.random().toString(36).substr(2, 9);

            this.saveMockDb(db);
            return { message: 'Mock payment success', paymentId: db.bookings[bookingIndex].paymentId };
        }
        // 8. GET /blogs
        if (method === 'GET' && endpoint.startsWith('/blogs')) {
            const url = new URL(endpoint, 'http://dummy.com');
            const pathParts = url.pathname.split('/');

            if (pathParts.length === 3 && pathParts[2] !== '') {
                const slug = pathParts[2];
                const post = db.blogs.find(b => b.slug === slug);
                if (!post) return notFound('Blog post not found');
                return post;
            }
            const list = [...db.blogs];
            list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            return list;
        }
        // 9. POST /contacts
        if (method === 'POST' && endpoint === '/contacts') {
            const { name, email, subject, message } = body;
            if (!name || !email || !subject || !message) return badRequest('Missing feedback fields');
            const newContact = {
                id: 'ct_' + Math.random().toString(36).substr(2, 9),
                name,
                email,
                subject,
                message,
                status: 'unread',
                createdAt: new Date().toISOString()
            };
            db.contacts.push(newContact);
            this.saveMockDb(db);
            return { message: 'Message sent (Mock)', contact: newContact };
        }
        // 10. Admin Routes
        if (endpoint.startsWith('/admin')) {
            if (!currentUser || currentUser.role !== 'admin') return forbidden();
            // GET /admin/stats
            if (endpoint === '/admin/stats') {
                const bookingsCount = db.bookings.length;
                const usersCount = db.users.length;
                const workersCount = db.workers.length;
                const homeownersCount = db.users.filter(u => u.role === 'homeowner').length;
                const totalEarnings = db.bookings
                    .filter(b => b.paymentStatus === 'paid')
                    .reduce((sum, b) => sum + b.paymentAmount, 0);
                const pendingApprovals = db.workers.filter(w => w.verificationStatus === 'pending').length;
                const unreadMessages = db.contacts.filter(c => c.status === 'unread').length;
                return {
                    bookingsCount,
                    usersCount,
                    workersCount,
                    homeownersCount,
                    totalEarnings,
                    pendingApprovals,
                    unreadMessages
                };
            }
            // GET /admin/users
            if (endpoint === '/admin/users') {
                return db.users.map(u => {
                    const details = { ...u };
                    delete details.password;
                    if (u.role === 'worker') {
                        details.workerProfile = db.workers.find(w => w.userId === u.id);
                    }
                    return details;
                });
            }
            // PUT /admin/verify-worker
            if (endpoint === '/admin/verify-worker') {
                const { workerUserId, status } = body;
                const workerIndex = db.workers.findIndex(w => w.userId === workerUserId);
                if (workerIndex === -1) return notFound('Worker not found');
                db.workers[workerIndex].verificationStatus = status;
                this.saveMockDb(db);
                return { message: `Worker status updated to ${status}` };
            }
            // GET /admin/contacts
            if (endpoint === '/admin/contacts') {
                const contacts = [...db.contacts];
                contacts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                return contacts;
            }
            // PUT /admin/contacts/:id/read
            if (endpoint.startsWith('/admin/contacts/') && endpoint.endsWith('/read')) {
                const parts = endpoint.split('/');
                const contactId = parts[3];
                const contactIndex = db.contacts.findIndex(c => c.id === contactId);

                if (contactIndex !== -1) {
                    db.contacts[contactIndex].status = 'read';
                    this.saveMockDb(db);
                }
                return { message: 'Message read' };
            }
        }
        return notFound('Mock API endpoint not matching catalog');
    }
}
export const api = new APIClient();
export default api;