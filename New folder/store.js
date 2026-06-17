class Store {
    constructor() {
        this.state = {
            user: null,
            isLoggedIn: false,
            role: null // 'homeowner', 'worker', or 'admin'
        };
        this.listeners = [];
    }

    getState() {
        return this.state;
    }

    isAuthenticated() {
        return this.state.isLoggedIn;
    }

    // New helper: Returns the currently logged-in user object
    getUser() {
        return this.state.user;
    }

    // New helper: Returns the role of the user ('homeowner', 'worker', 'admin')
    getUserRole() {
        return this.state.role;
    }

    setState(newState) {
        this.state = { ...this.state, ...newState };
        this.listeners.forEach(listener => listener(this.state));
    }

    subscribe(listener) {
        this.listeners.push(listener);
        return () => {
            this.listeners = this.listeners.filter(l => l !== listener);
        };
    }
}

const store = new Store();
export { store };