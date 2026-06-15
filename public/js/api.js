// ============================================
// WorkX Hub — API Client
// ============================================

const API = (() => {
    const BASE = '';

    function getToken() {
        return localStorage.getItem('workx_token');
    }

    function setToken(token) {
        localStorage.setItem('workx_token', token);
    }

    function removeToken() {
        localStorage.removeItem('workx_token');
        localStorage.removeItem('workx_user');
    }

    function getUser() {
        try {
            return JSON.parse(localStorage.getItem('workx_user'));
        } catch {
            return null;
        }
    }

    function setUser(user) {
        localStorage.setItem('workx_user', JSON.stringify(user));
    }

    function isLoggedIn() {
        return !!getToken();
    }

    async function request(method, path, body = null) {
        const opts = {
            method,
            headers: { 'Content-Type': 'application/json' }
        };
        const token = getToken();
        if (token) {
            opts.headers['Authorization'] = `Bearer ${token}`;
        }
        if (body) {
            opts.body = JSON.stringify(body);
        }
        const res = await fetch(`${BASE}${path}`, opts);
        const data = await res.json();
        if (!res.ok) {
            throw new Error(data.error || `Request failed (${res.status})`);
        }
        return data;
    }

    async function get(path) { return request('GET', path); }
    async function post(path, body) { return request('POST', path, body); }
    async function put(path, body) { return request('PUT', path, body); }

    // Auth
    async function login(email, password) {
        const data = await post('/api/auth/login', { email, password });
        setToken(data.token);
        setUser(data.user);
        return data;
    }

    async function registerHomeowner(formData) {
        const data = await post('/api/auth/register-homeowner', formData);
        setToken(data.token);
        setUser(data.user);
        return data;
    }

    async function registerWorker(formData) {
        const data = await post('/api/auth/register-worker', formData);
        setToken(data.token);
        setUser(data.user);
        return data;
    }

    async function getMe() {
        return get('/api/auth/me');
    }

    function logout() {
        removeToken();
        window.location.hash = '#/';
        window.location.reload();
    }

    // Workers
    async function getWorkers(category, search) {
        let q = '/api/workers?';
        if (category) q += `category=${encodeURIComponent(category)}&`;
        if (search) q += `search=${encodeURIComponent(search)}&`;
        return get(q);
    }

    async function getWorker(id) {
        return get(`/api/workers/${id}`);
    }

    // Bookings
    async function getBookings() { return get('/api/bookings'); }
    async function createBooking(data) { return post('/api/bookings', data); }
    async function updateBookingStatus(id, status) { return put(`/api/bookings/${id}/status`, { status }); }
    async function submitReview(id, rating, review) { return post(`/api/bookings/${id}/review`, { rating, review }); }

    // Payments
    async function checkout(paymentData) { return post('/api/payments/checkout', paymentData); }

    // Blog
    async function getBlogs() { return get('/api/blogs'); }
    async function getBlog(slug) { return get(`/api/blogs/${slug}`); }

    // Contact
    async function submitContact(data) { return post('/api/contacts', data); }

    // Admin
    async function getAdminStats() { return get('/api/admin/stats'); }
    async function getAdminUsers() { return get('/api/admin/users'); }
    async function verifyWorker(workerUserId, status) { return put('/api/admin/verify-worker', { workerUserId, status }); }
    async function getAdminContacts() { return get('/api/admin/contacts'); }
    async function markContactRead(id) { return put(`/api/admin/contacts/${id}/read`, {}); }

    return {
        getToken, getUser, isLoggedIn, login, logout,
        registerHomeowner, registerWorker, getMe,
        getWorkers, getWorker,
        getBookings, createBooking, updateBookingStatus, submitReview,
        checkout,
        getBlogs, getBlog,
        submitContact,
        getAdminStats, getAdminUsers, verifyWorker, getAdminContacts, markContactRead
    };
})();
