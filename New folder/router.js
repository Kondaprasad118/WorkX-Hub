import { store } from './store.js';

export class Router {
    constructor() {
        this.routes = [];
        
        // Listen for URL hash transitions smoothly
        window.addEventListener('hashchange', () => this.resolveRoute());
    }

    addRoute(path, viewClass) {
        // Convert route parameters like :id or :slug into regex patterns
        const regexPath = path.replace(/:\w+/g, '([^/]+)');
        this.routes.push({
            path,
            regex: new RegExp(`^#${regexPath}$`),
            viewClass
        });
    }

    getRouteParams(route, hash) {
        const values = hash.match(route.regex);
        if (!values) return {};
        
        const keys = [...route.path.matchAll(/:(\w+)/g)].map(match => match[1]);
        return Object.fromEntries(keys.map((key, i) => [key, values[i + 1]]));
    }

    async resolveRoute() {
        let hash = window.location.hash || '#/';
        
        // Find the matching registered route rule
        let route = this.routes.find(r => r.regex.test(hash));
        
        // Fallback to home page route rules if path isn't found
        if (!route) {
            route = this.routes.find(r => r.path === '/');
            hash = '#/';
        }

        // --- AUTHENTICATION GUARD SYSTEM ---
        const protectedRoutes = [
            '#/dashboard-homeowner', 
            '#/dashboard-worker', 
            '#/dashboard-admin',
            '#/book',
            '#/payment'
        ];

        const isProtected = protectedRoutes.some(p => hash.startsWith(p));
        if (isProtected && !store.isAuthenticated()) {
            window.showToast('Access Denied', 'Please log in to view this workspace panel.', 'warning');
            window.location.hash = '#/login';
            return;
        }

        // Check explicit roles for specific dashboards
        const userRole = store.getUserRole();
        if (hash === '#/dashboard-admin' && userRole !== 'admin') {
            window.location.hash = '#/';
            return;
        }
        if (hash === '#/dashboard-worker' && userRole !== 'worker') {
            window.location.hash = '#/';
            return;
        }
        if (hash === '#/dashboard-homeowner' && userRole !== 'homeowner') {
            window.location.hash = '#/';
            return;
        }

        // Instantiating the current view engine layout
        const params = this.getRouteParams(route, hash);
        const viewInstance = new route.viewClass(params);

        // Safely fetch the app container element directly
        const appContainer = document.getElementById('app');

        try {
            // Update document title dynamically
            if (viewInstance.title) {
                document.title = viewInstance.title;
            }

            // Line 108: Render the safe localized view text component directly into the container
            if (appContainer) {
                appContainer.innerHTML = await viewInstance.getHtml();
            }

            // Fire events (like the language switching tracker dropdown)
            if (typeof viewInstance.initEvents === 'function') {
                viewInstance.initEvents();
            }

            // Scroll screen smoothly back to top on transitions
            window.scrollTo({ top: 0, behavior: 'smooth' });

        } catch (error) {
            console.error('Error rendering page:', error);
            if (appContainer) {
                appContainer.innerHTML = `
                    <div style="font-family: Arial, sans-serif; text-align: center; padding: 50px 20px;">
                        <h2 style="color: #e74c3c;">Application Interface Rendering Error</h2>
                        <p style="color: #7f8c8d;">An unexpected asset mismatch structure occurred while building this view configuration layer.</p>
                        <a href="#/" style="color: #3498db; font-weight: bold; text-decoration: none;">Return to Safety Hub Home</a>
                    </div>
                `;
            }
        }
    }
}

const router = new Router();
export { router };