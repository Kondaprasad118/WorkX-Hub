import { store } from './store.js';
// Route configuration mapping paths to view constructor files
class Router {
    constructor() {
        this.routes = {};

        // Listen to hash changes and page load
        window.addEventListener('hashchange', () => this.resolveRoute());
        window.addEventListener('load', () => this.resolveRoute());
    }
    // Register a route
    addRoute(path, viewClass) {
        // Convert path like '/worker/:id' to regex: ^/worker/([^/]+)$
        const paramNames = [];
        const regexPath = path
            .replace(/([:*])(\w+)/g, (full, type, name) => {
                paramNames.push(name);
                return '([^/]+)';
            })
            .replace(/\//g, '\\/');
        this.routes[path] = {
            regex: new RegExp(`^#${regexPath}$`),
            paramNames,
            viewClass
        };
    }
    // Resolve active hash route and mount corresponding view
    async resolveRoute() {
        const appEl = document.getElementById('app');
        let hash = window.location.hash || '#/';

        // Close mobile nav menu on route change if open
        const navMenu = document.getElementById('nav-menu');
        if (navMenu) navMenu.classList.remove('show');
        // Route Guards for Auth redirects
        const isAuthenticated = store.isAuthenticated();
        const role = store.getUserRole();
        // Catch generic '#/dashboard' and route to correct role panel
        if (hash === '#/dashboard') {
            if (!isAuthenticated) {
                window.location.hash = '#/login';
                return;
            }
            if (role === 'admin') window.location.hash = '#/dashboard-admin';
            else if (role === 'worker') window.location.hash = '#/dashboard-worker';
            else window.location.hash = '#/dashboard-homeowner';
            return;
        }
        // Auth page bypass guard: logged in users should go to their dashboard
        if (isAuthenticated && ['#/login', '#/register-homeowner', '#/register-worker'].includes(hash)) {
            window.location.hash = '#/dashboard';
            return;
        }
        // Protected Route Guards
        const protectedRoutes = [
            '#/dashboard-homeowner',
            '#/dashboard-worker',
            '#/dashboard-admin',
            '#/book',
            '#/payment'
        ];

        if (!isAuthenticated && (protectedRoutes.includes(hash) || hash.startsWith('#/book') || hash.startsWith('#/payment'))) {
            // Direct guests to login
            window.location.hash = '#/login';
            return;
        }
        // Guard role-specific dashboards
        if (hash === '#/dashboard-admin' && role !== 'admin') { window.location.hash = '#/dashboard'; return; }
        if (hash === '#/dashboard-worker' && role !== 'worker') { window.location.hash = '#/dashboard'; return; }
        if (hash === '#/dashboard-homeowner' && role !== 'homeowner') { window.location.hash = '#/dashboard'; return; }
        // Match Route Regexes
        let match = null;
        let params = {};
        for (const path in this.routes) {
            const route = this.routes[path];
            const matchResult = hash.match(route.regex);
            if (matchResult) {
                match = route;
                // Map parameter values from regex groups to param names
                route.paramNames.forEach((name, idx) => {
                    params[name] = matchResult[idx + 1];
                });
                break;
            }
        }
        if (!match) {
            // 404 handler fallback: redirect to landing page
            console.warn(`Route not found: ${hash}, redirecting to home.`);
            window.location.hash = '#/';
            return;
        }
        // Update active nav-link elements
        this.updateActiveNavLinks(hash);
        // Render loading indicator
        appEl.innerHTML = `
      <div class="loading-spinner-container">
        <div class="spinner"></div>
        <p>Loading view...</p>
      </div>
    `;
        try {
            // Instantiate and render matched View
            const View = match.viewClass;
            const viewInstance = new View(params);

            // Inject returned HTML template string
            appEl.innerHTML = await viewInstance.render();

            // Mount callbacks and form click handlers
            if (typeof viewInstance.afterRender === 'function') {
                await viewInstance.afterRender();
            }

            // Scroll back to top on page navigation
            window.scrollTo(0, 0);
        } catch (error) {
            console.error('Error rendering page:', error);
            appEl.innerHTML = `
        <div class="container mt-8 text-center">
          <div class="card" style="max-width: 500px; margin: 0 auto; border-top: 4px solid var(--danger);">
            <i class="fa-solid fa-circle-exclamation" style="font-size: 3rem; color: var(--danger); margin-bottom: 1rem;"></i>
            <h3 class="mb-2">View Render Failed</h3>
            <p class="mb-4">${error.message || 'An unexpected error occurred while loading this page.'}</p>
            <a href="#/" class="btn btn-primary">Go to Homepage</a>
          </div>
        </div>
      `;
        }
    }
    // Set active nav link indicator styling
    updateActiveNavLinks(hash) {
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.classList.remove('active');

            const route = link.getAttribute('data-route');
            if (hash === '#/' && route === 'landing') {
                link.classList.add('active');
            } else if (hash.startsWith('#/about') && route === 'about') {
                link.classList.add('active');
            } else if (hash.startsWith('#/blogs') && route === 'blogs') {
                link.classList.add('active');
            } else if (hash.startsWith('#/contact') && route === 'contact') {
                link.classList.add('active');
            }
        });
    }
}
export const router = new Router();
export default router;