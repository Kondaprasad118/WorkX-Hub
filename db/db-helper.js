const fs = require('fs');
const path = require('path');
const DB_PATH = path.join(__dirname, 'database.json');
// Ensure database file exists
function initDb() {
    if (!fs.existsSync(DB_PATH)) {
        const initialData = {
            users: [],
            workers: [],
            bookings: [],
            blogs: [],
            contacts: []
        };
        fs.writeFileSync(DB_PATH, JSON.stringify(initialData, null, 2), 'utf8');
    }
}
// Read database
function readDb() {
    initDb();
    try {
        const data = fs.readFileSync(DB_PATH, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading database:', error);
        return { users: [], workers: [], bookings: [], blogs: [], contacts: [] };
    }
}
// Write database
function writeDb(data) {
    try {
        fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), 'utf8');
        return true;
    } catch (error) {
        console.error('Error writing database:', error);
        return false;
    }
}
// Helper query methods
const db = {
    find: (collection, filterFn = () => true) => {
        const data = readDb();
        return (data[collection] || []).filter(filterFn);
    },
    findOne: (collection, filterFn) => {
        const data = readDb();
        return (data[collection] || []).find(filterFn);
    },
    insert: (collection, item) => {
        const data = readDb();
        if (!data[collection]) data[collection] = [];

        // Generate simple unique ID if not present
        if (!item.id) {
            const prefix = {
                users: 'usr_',
                workers: 'wrk_',
                bookings: 'bk_',
                blogs: 'blog_',
                contacts: 'ct_'
            }[collection] || 'id_';
            item.id = prefix + Math.random().toString(36).substr(2, 9);
        }

        item.createdAt = item.createdAt || new Date().toISOString();
        data[collection].push(item);
        writeDb(data);
        return item;
    },
    update: (collection, filterFn, updateData) => {
        const data = readDb();
        if (!data[collection]) return [];

        let updatedItems = [];
        data[collection] = data[collection].map(item => {
            if (filterFn(item)) {
                const updated = { ...item, ...updateData, updatedAt: new Date().toISOString() };
                updatedItems.push(updated);
                return updated;
            }
            return item;
        });

        if (updatedItems.length > 0) {
            writeDb(data);
        }
        return updatedItems;
    },
    delete: (collection, filterFn) => {
        const data = readDb();
        if (!data[collection]) return false;

        const originalLength = data[collection].length;
        data[collection] = data[collection].filter(item => !filterFn(item));

        if (data[collection].length !== originalLength) {
            writeDb(data);
            return true;
        }
        return false;
    },

    // Custom reset method for seeding
    reset: (newData) => {
        return writeDb(newData);
    }
};
module.exports = db;