import { router } from './router.js';
import { store } from './store.js';
// Import all view modules
import LandingView from './views/LandingView.js';
import AboutView from './views/AboutView.js';
import BlogView from './views/BlogView.js';
import ContactView from './views/ContactView.js';
import LoginView from './views/LoginView.js';
import RegisterHomeownerView from './views/RegisterHomeownerView.js';
import RegisterWorkerView from './views/RegisterWorkerView.js';
import HomeownerDashboardView from './views/HomeownerDashboardView.js';
import WorkerDashboardView from './views/WorkerDashboardView.js';
import AdminDashboardView from './views/AdminDashboardView.js';
import WorkerProfileView from './views/WorkerProfileView.js';
import BookWorkerView from './views/BookWorkerView.js';
import PaymentView from './views/PaymentView.js';
import PrivacyView from './views/PrivacyView.js';
import TermsView from './views/TermsView.js';
// Register routes
router.addRoute('/', LandingView);
router.addRoute('/about', AboutView);
router.addRoute('/blogs', BlogView);
router.addRoute('/blogs/:slug', BlogView);
router.addRoute('/contact', ContactView);
router.addRoute('/login', LoginView);
router.addRoute('/register-homeowner', RegisterHomeownerView);
router.addRoute('/register-worker', RegisterWorkerView);
router.addRoute('/dashboard-homeowner', HomeownerDashboardView);
router.addRoute('/dashboard-worker', WorkerDashboardView);
router.addRoute('/dashboard-admin', AdminDashboardView);
router.addRoute('/worker/:id', WorkerProfileView);
router.addRoute('/book', BookWorkerView);
router.addRoute('/payment/:bookingId', PaymentView);
router.addRoute('/privacy', PrivacyView);
router.addRoute('/terms', TermsView);
// --- GLOBAL TOAST SYSTEM ---
window.showToast = function (title, message, type = 'success') {
    const container = document.getElementById('toast-container');
    if (!container) return;
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;

    // Set icons based on toast alert type
    let iconClass = 'fa-circle-check';
    if (type === 'error') iconClass = 'fa-circle-exclamation';
    if (type === 'warning') iconClass = 'fa-triangle-exclamation';
    if (type === 'info') iconClass = 'fa-circle-info';
    toast.innerHTML = `
    <i class="fa-solid ${iconClass} toast-icon"></i>
    <div class="toast-content">
      <div class="toast-title">${title}</div>
      <div class="toast-msg">${message}</div>
    </div>
    <button class="toast-close"><i class="fa-solid fa-xmark"></i></button>
  `;
    container.appendChild(toast);
    // Close click handler
    const closeBtn = toast.querySelector('.toast-close');
    closeBtn.addEventListener('click', () => {
        toast.style.transform = 'scale(0.9) translateX(100%)';
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 300);
    });
    // Auto-remove after 4 seconds
    setTimeout(() => {
        if (toast.parentNode) {
            toast.style.transform = 'scale(0.9) translateX(100%)';
            toast.style.opacity = '0';
            setTimeout(() => toast.remove(), 300);
        }
    }, 4000);
};
// --- AUTH UI SYNC ---
function updateNavbarAuthUI() {
    const guestLinks = document.getElementById('auth-guest-links');
    const userLinks = document.getElementById('auth-user-links');
    const userNameBadge = document.getElementById('user-name-badge');
    const dashboardLink = document.getElementById('dashboard-link');
    const isAuthenticated = store.isAuthenticated();
    const user = store.getUser();
    if (isAuthenticated && user) {
        guestLinks.classList.add('hidden');
        userLinks.classList.remove('hidden');
        userNameBadge.innerText = user.name;

        // Set appropriate dashboard destination
        if (user.role === 'admin') {
            dashboardLink.setAttribute('href', '#/dashboard-admin');
        } else if (user.role === 'worker') {
            dashboardLink.setAttribute('href', '#/dashboard-worker');
        } else {
            dashboardLink.setAttribute('href', '#/dashboard-homeowner');
        }
    } else {
        guestLinks.classList.remove('hidden');
        userLinks.classList.add('hidden');
    }
}
// Listen for custom authentication changes
window.addEventListener('auth-changed', updateNavbarAuthUI);
// Handle Logout Click
const logoutBtn = document.getElementById('logout-btn');
if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
        store.clearSession();
        window.dispatchEvent(new CustomEvent('auth-changed'));
        window.showToast('Logged Out', 'You have been successfully logged out.', 'info');
        window.location.hash = '#/';
    });
}
// --- MOBILE NAV TOGGLE ---
const mobileNavToggle = document.getElementById('mobile-nav-toggle');
const navMenu = document.getElementById('nav-menu');
if (mobileNavToggle && navMenu) {
    mobileNavToggle.addEventListener('click', () => {
        navMenu.classList.toggle('show');
        const icon = mobileNavToggle.querySelector('i');
        if (navMenu.classList.contains('show')) {
            icon.className = 'fa-solid fa-xmark';
        } else {
            icon.className = 'fa-solid fa-bars';
        }
    });
}
// Initialize navbar state on startup
updateNavbarAuthUI();
// Bootstrap and start router matching
router.resolveRoute();
console.log('WorkX Hub SPA successfully initialized.');