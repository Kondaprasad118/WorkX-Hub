// ============================================
// WorkX Hub — SPA Router
// ============================================

const Router = (() => {
    const routes = [];
    let notFoundHandler = null;

    function add(pattern, handler) {
        // Convert /workers/:id to regex
        const paramNames = [];
        const regexStr = pattern.replace(/:([^/]+)/g, (_, name) => {
            paramNames.push(name);
            return '([^/]+)';
        });
        routes.push({
            pattern,
            regex: new RegExp(`^${regexStr}$`),
            paramNames,
            handler
        });
    }

    function notFound(handler) {
        notFoundHandler = handler;
    }

    function getHash() {
        const hash = window.location.hash.slice(1) || '/';
        return hash;
    }

    function navigate(path) {
        window.location.hash = '#' + path;
    }

    function resolve() {
        const fullPath = getHash();
        // Split path and query
        const [path, queryString] = fullPath.split('?');
        const query = {};
        if (queryString) {
            queryString.split('&').forEach(pair => {
                const [k, v] = pair.split('=');
                query[decodeURIComponent(k)] = decodeURIComponent(v || '');
            });
        }

        for (const route of routes) {
            const match = path.match(route.regex);
            if (match) {
                const params = {};
                route.paramNames.forEach((name, i) => {
                    params[name] = decodeURIComponent(match[i + 1]);
                });
                // Update active nav
                updateActiveNav(path);
                // Scroll to top
                window.scrollTo({ top: 0, behavior: 'instant' });
                // Call handler
                route.handler({ params, query, path });
                return;
            }
        }

        if (notFoundHandler) {
            notFoundHandler({ path, query: {} });
        }
    }

    function updateActiveNav(path) {
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            const route = link.getAttribute('data-route');
            if (route === path || (route && route !== '/' && path.startsWith(route))) {
                link.classList.add('active');
            }
        });
    }

    function init() {
        window.addEventListener('hashchange', resolve);
        resolve();
    }

    return { add, notFound, navigate, init, getHash };
})();
