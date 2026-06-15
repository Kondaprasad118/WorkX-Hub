const bcrypt = require('bcryptjs');
const db = require('./db-helper');
const saltRounds = 10;
const hashedPassword = bcrypt.hashSync('password123', saltRounds);
const hashedAdminPassword = bcrypt.hashSync('admin123', saltRounds);
const seedData = {
    users: [
        // Admin
        {
            id: "usr_admin",
            email: "admin@workxhub.com",
            password: hashedAdminPassword,
            role: "admin",
            name: "Super Admin",
            phone: "+1 555-0100",
            address: "WorkX Hub HQ, Seattle, WA",
            createdAt: new Date().toISOString()
        },
        // Homeowners
        {
            id: "usr_homeowner1",
            email: "jane@example.com",
            password: hashedPassword,
            role: "homeowner",
            name: "Jane Doe",
            phone: "+1 555-0101",
            address: "123 Maple St, Seattle, WA 98101",
            createdAt: new Date().toISOString()
        },
        {
            id: "usr_homeowner2",
            email: "bob@example.com",
            password: hashedPassword,
            role: "homeowner",
            name: "Bob Smith",
            phone: "+1 555-0102",
            address: "456 Oak Ave, Tacoma, WA 98402",
            createdAt: new Date().toISOString()
        },
        {
            id: "usr_homeowner3",
            email: "alice@example.com",
            password: hashedPassword,
            role: "homeowner",
            name: "Alice Johnson",
            phone: "+1 555-0103",
            address: "789 Pine Rd, Bellevue, WA 98004",
            createdAt: new Date().toISOString()
        },
        // Workers (10 Workers)
        {
            id: "usr_worker1",
            email: "plumber@workxhub.com",
            password: hashedPassword,
            role: "worker",
            name: "John Miller",
            phone: "+1 555-0201",
            address: "101 Cedar St, Seattle, WA 98103",
            createdAt: new Date().toISOString()
        },
        {
            id: "usr_worker2",
            email: "electrician@workxhub.com",
            password: hashedPassword,
            role: "worker",
            name: "Sarah Sparks",
            phone: "+1 555-0202",
            address: "202 Birch Blvd, Seattle, WA 98105",
            createdAt: new Date().toISOString()
        },
        {
            id: "usr_worker3",
            email: "carpenter@workxhub.com",
            password: hashedPassword,
            role: "worker",
            name: "David Wood",
            phone: "+1 555-0203",
            address: "303 Elm Rd, Tacoma, WA 98405",
            createdAt: new Date().toISOString()
        },
        {
            id: "usr_worker4",
            email: "painter@workxhub.com",
            password: hashedPassword,
            role: "worker",
            name: "Elena Rostova",
            phone: "+1 555-0204",
            address: "404 Walnut St, Bellevue, WA 98005",
            createdAt: new Date().toISOString()
        },
        {
            id: "usr_worker5",
            email: "driver@workxhub.com",
            password: hashedPassword,
            role: "worker",
            name: "Marcus Speed",
            phone: "+1 555-0205",
            address: "505 Ash Way, Seattle, WA 98109",
            createdAt: new Date().toISOString()
        },
        {
            id: "usr_worker6",
            email: "ac@workxhub.com",
            password: hashedPassword,
            role: "worker",
            name: "Robert Chill",
            phone: "+1 555-0206",
            address: "606 Pine Pl, Renton, WA 98057",
            createdAt: new Date().toISOString()
        },
        {
            id: "usr_worker7",
            email: "appliance@workxhub.com",
            password: hashedPassword,
            role: "worker",
            name: "Thomas Fixer",
            phone: "+1 555-0207",
            address: "707 Spruce Ave, Kent, WA 98030",
            createdAt: new Date().toISOString()
        },
        {
            id: "usr_worker8",
            email: "cleaner@workxhub.com",
            password: hashedPassword,
            role: "worker",
            name: "Maria Clean",
            phone: "+1 555-0208",
            address: "808 Fir Dr, Everett, WA 98201",
            createdAt: new Date().toISOString()
        },
        {
            id: "usr_worker9",
            email: "gardener@workxhub.com",
            password: hashedPassword,
            role: "worker",
            name: "Oliver Green",
            phone: "+1 555-0209",
            address: "909 Alder St, Redmond, WA 98052",
            createdAt: new Date().toISOString()
        },
        {
            id: "usr_worker10",
            email: "pest@workxhub.com",
            password: hashedPassword,
            role: "worker",
            name: "Alan Hunter",
            phone: "+1 555-0210",
            address: "110 Cypress Ct, Seattle, WA 98122",
            createdAt: new Date().toISOString()
        }
    ],

    workers: [
        {
            userId: "usr_worker1",
            category: "Plumber",
            experience: 8,
            hourlyRate: 50,
            bio: "Licensed plumber with 8 years of experience. Specializing in high-quality residential leak repair, pipe routing, water heater installation, and emergency clog resolutions. Customer satisfaction is my top priority.",
            skills: ["Leak Repair", "Drain Cleaning", "Water Heaters", "Pipe Fitting", "Emergency Plumbing"],
            rating: 4.9,
            reviewsCount: 24,
            availability: "available",
            profileImage: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80",
            verificationStatus: "verified"
        },
        {
            userId: "usr_worker2",
            category: "Electrician",
            experience: 6,
            hourlyRate: 60,
            bio: "Certified residential electrician. Expert in smart home installations, panel upgrades, rewiring, light fixture installations, and troubleshooting complex electrical issues. Safe and code-compliant work guaranteed.",
            skills: ["Panel Upgrades", "Smart Home Installation", "Rewiring", "Fixture Installation", "Safety Inspection"],
            rating: 4.8,
            reviewsCount: 18,
            availability: "available",
            profileImage: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
            verificationStatus: "verified"
        },
        {
            userId: "usr_worker3",
            category: "Carpenter",
            experience: 12,
            hourlyRate: 45,
            bio: "Master craftsman specializing in custom woodworking, furniture repair, deck building, framing, and cabinet installation. Bringing a high level of detail and passion to every woodcraft project.",
            skills: ["Custom Furniture", "Deck Building", "Cabinet Install", "Framing", "Wood Repair"],
            rating: 5.0,
            reviewsCount: 15,
            availability: "available",
            profileImage: "https://images.unsplash.com/photo-1620122303020-43ec4b6cf7f8?w=150&auto=format&fit=crop&q=80",
            verificationStatus: "verified"
        },
        {
            userId: "usr_worker4",
            category: "Painter",
            experience: 5,
            hourlyRate: 35,
            bio: "Professional interior and exterior painter. I provide smooth, clean coats, precision drywall patching, wallpaper removal, and color consultation services. Dedicated to transforming your space beautifully.",
            skills: ["Interior Painting", "Exterior Painting", "Drywall Patching", "Wallpaper Removal", "Trim Painting"],
            rating: 4.7,
            reviewsCount: 20,
            availability: "busy",
            profileImage: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80",
            verificationStatus: "verified"
        },
        {
            userId: "usr_worker5",
            category: "Driver",
            experience: 10,
            hourlyRate: 25,
            bio: "Professional and courteous personal driver. Highly familiar with the Greater Seattle Area. Available for long-distance trips, errands, airport transfers, and event transportation. Clean driving record.",
            skills: ["Airport Transfers", "Errands", "Long Distance", "Navigational Skills", "Defensive Driving"],
            rating: 4.9,
            reviewsCount: 30,
            availability: "available",
            profileImage: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80",
            verificationStatus: "verified"
        },
        {
            userId: "usr_worker6",
            category: "AC Technician",
            experience: 7,
            hourlyRate: 55,
            bio: "Certified HVAC and AC specialist. Expert in cooling system installations, seasonal maintenance, refrigerant refills, and compressor repairs. Fast response to get your home cool again.",
            skills: ["AC Installation", "HVAC Maintenance", "Refrigerant Refills", "Compressor Repair", "Thermostats"],
            rating: 4.6,
            reviewsCount: 14,
            availability: "available",
            profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
            verificationStatus: "verified"
        },
        {
            userId: "usr_worker7",
            category: "Appliance Repair",
            experience: 9,
            hourlyRate: 40,
            bio: "Expert technician for all major home appliances. Specializing in fixing refrigerators, washing machines, dryers, dishwashers, and ovens. Fast diagnostics and quality spare parts used.",
            skills: ["Refrigerator Fix", "Washer & Dryer", "Dishwashers", "Ovens & Stoves", "Diagnostics"],
            rating: 4.8,
            reviewsCount: 22,
            availability: "available",
            profileImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
            verificationStatus: "verified"
        },
        {
            userId: "usr_worker8",
            category: "House Cleaner",
            experience: 4,
            hourlyRate: 30,
            bio: "Detail-oriented house cleaner. Offering deep cleaning, standard weekly/bi-weekly tidy ups, move-in/move-out cleanups, and post-renovation cleaning. Eco-friendly cleaning supplies provided.",
            skills: ["Deep Cleaning", "Standard Tidy Up", "Move-in/Move-out", "Eco Supplies", "Organizing"],
            rating: 4.9,
            reviewsCount: 42,
            availability: "available",
            profileImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
            verificationStatus: "verified"
        },
        {
            userId: "usr_worker9",
            category: "Gardener",
            experience: 6,
            hourlyRate: 35,
            bio: "Professional landscape gardener. From lawn care and hedge trimming to flowerbed design and weed management. Let me help you create and maintain a lush, beautiful backyard escape.",
            skills: ["Lawn Mowing", "Hedge Trimming", "Flowerbed Design", "Weeding", "Soil Fertilizing"],
            rating: 4.8,
            reviewsCount: 16,
            availability: "available",
            profileImage: "https://images.unsplash.com/photo-1607990283143-e81e7a2c93ab?w=150&auto=format&fit=crop&q=80",
            verificationStatus: "verified"
        },
        {
            userId: "usr_worker10",
            category: "Pest Control",
            experience: 5,
            hourlyRate: 45,
            bio: "Licensed pest extermination technician. Offering pet-friendly, effective treatments for ants, rodents, spiders, bed bugs, and wasps. Comprehensive home inspection and barrier defense setup.",
            skills: ["Ant Treatments", "Rodent Control", "Spider Spraying", "Wasp Nest Removal", "Home Inspections"],
            rating: 4.7,
            reviewsCount: 11,
            availability: "offline",
            profileImage: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80",
            verificationStatus: "pending"
        }
    ],
    bookings: [
        // Completed Booking 1
        {
            id: "bk_seed1",
            homeownerId: "usr_homeowner1",
            workerId: "usr_worker1",
            category: "Plumber",
            date: "2026-06-10",
            time: "09:00 AM",
            address: "123 Maple St, Seattle, WA 98101",
            description: "Repairing a leaky faucet under the kitchen sink. Water has started leaking into the cabinet.",
            status: "completed",
            paymentStatus: "paid",
            paymentAmount: 100.00,
            paymentId: "pay_seed1",
            rating: 5,
            review: "John arrived right on time, diagnosed the issue quickly, and fixed it perfectly. He also cleaned up everything afterwards. Very professional!",
            createdAt: "2026-06-08T10:00:00Z"
        },
        // Completed Booking 2
        {
            id: "bk_seed2",
            homeownerId: "usr_homeowner2",
            workerId: "usr_worker2",
            category: "Electrician",
            date: "2026-06-12",
            time: "02:00 PM",
            address: "456 Oak Ave, Tacoma, WA 98402",
            description: "Installing smart dimmers in the living room and checking a faulty outlet in the garage.",
            status: "completed",
            paymentStatus: "paid",
            paymentAmount: 180.00,
            paymentId: "pay_seed2",
            rating: 4,
            review: "Sarah did a great job installing the dimmers. The garage outlet was also fixed. She was very thorough and safe. Knocked off 1 star because she was 15 minutes late, but otherwise excellent.",
            createdAt: "2026-06-10T14:30:00Z"
        },
        // Accepted Active Booking
        {
            id: "bk_seed3",
            homeownerId: "usr_homeowner1",
            workerId: "usr_worker3",
            category: "Carpenter",
            date: "2026-06-18",
            time: "11:00 AM",
            address: "123 Maple St, Seattle, WA 98101",
            description: "Repairing two broken steps on the wooden deck in the backyard and reinforcing the handrail.",
            status: "accepted",
            paymentStatus: "unpaid",
            paymentAmount: 135.00,
            paymentId: "",
            rating: null,
            review: "",
            createdAt: "2026-06-14T09:15:00Z"
        },
        // Pending Booking
        {
            id: "bk_seed4",
            homeownerId: "usr_homeowner3",
            workerId: "usr_worker8",
            category: "House Cleaner",
            date: "2026-06-19",
            time: "10:00 AM",
            address: "789 Pine Rd, Bellevue, WA 98004",
            description: "Standard house cleaning, 3 bedrooms, 2 bathrooms. Please focus on dusting and vacuuming the carpets.",
            status: "pending",
            paymentStatus: "unpaid",
            paymentAmount: 120.00,
            paymentId: "",
            rating: null,
            review: "",
            createdAt: "2026-06-15T08:00:00Z"
        }
    ],
    blogs: [
        {
            id: "blog_1",
            title: "5 Plumbing Red Flags Homeowners Should Never Ignore",
            slug: "plumbing-red-flags",
            excerpt: "From small drips to low water pressure, some minor issues can be signs of major plumbing disasters. Read this before a leak becomes a flood.",
            content: "<h3>1. Persistent Leaking Faucets</h3>\n<p>While a dripping faucet may seem like just an annoying sound, it can waste hundreds of gallons of water per year. More importantly, it is often a sign of high water pressure or damaged washers, which can eventually lead to pipe failure.</p>\n<h3>2. Low Water Pressure</h3>\n<p>If water is trickling out of your shower or sink, you might have a buildup of sediment, a hidden leak, or cracked pipes. Don't ignore it—hidden leaks can rot your walls and promote toxic mold growth.</p>\n<h3>3. Gurgling Sounds</h3>\n<p>If your toilet or sink gurgles when you run water elsewhere, your drainage system is struggling to vent air. This points to a severe clog deep in your line, which could lead to sewage backing up into your fixtures.</p>\n<h3>4. Unexplained Water Puddles</h3>\n<p>If you see damp spots on drywall or pooling water in your yard, you likely have a burst pipe or a slab leak. Turn off your main water valve immediately and call a certified plumber.</p>\n<h3>5. Discolored Water</h3>\n<p>Yellow, brown, or rusty water indicates that your pipes are corroding internally, or that your hot water heater is rusting out. This needs professional replacement before the tank bursts.</p>",
            author: "Robert Miller, Master Plumber",
            category: "Plumbing",
            readTime: "5 min read",
            image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&auto=format&fit=crop&q=80",
            createdAt: "2026-06-05T09:00:00Z"
        },
        {
            id: "blog_2",
            title: "How to Safely Troubleshoot Minor Electrical Issues",
            slug: "electrical-safety-troubleshooting",
            excerpt: "Electricity is powerful and dangerous. Learn what minor checks you can perform safely at home, and when it is absolutely vital to call a licensed electrician.",
            content: "<h3>Safety First: The Golden Rule</h3>\n<p>Before touching anything electrical, ALWAYS shut off the power at the main breaker panel. Use a non-contact voltage tester to verify there is absolutely no active current.</p>\n<h3>1. The Tripped Circuit Breaker</h3>\n<p>If an outlet or light suddenly stops working, check your breaker panel. A tripped breaker will be resting in the middle position. Turn it fully OFF, then back to ON. If it trips again immediately, do not force it—this indicates a dangerous short circuit or overloaded line. Call an electrician.</p>\n<h3>2. The Warm Wall Switch</h3>\n<p>If a light switch or outlet feels warm to the touch, turn it off immediately. Warmth indicates overloading or failing wiring behind the plate, which is a major fire hazard.</p>\n<h3>3. Flickering Lights</h3>\n<p>Flickering is often caused by a loose bulb, but if multiple lights flicker across a room, it points to loose service wiring in your main panel or floating neutral connections. This requires a professional to tighten and inspect.</p>\n<h3>4. GFCI Outlets That Won't Reset</h3>\n<p>Ground Fault Circuit Interrupter (GFCI) outlets protect you from shock in wet areas. If it trips and refuses to reset, the outlet is either faulty, or there is an active ground fault in the wiring. Leave it alone and call a pro.</p>",
            author: "Sarah Sparks, Certified Electrician",
            category: "Electrical",
            readTime: "6 min read",
            image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800&auto=format&fit=crop&q=80",
            createdAt: "2026-06-08T11:30:00Z"
        },
        {
            id: "blog_3",
            title: "Essential Summer Maintenance for Your Home Air Conditioner",
            slug: "summer-ac-maintenance",
            excerpt: "Keep your house cool and reduce your electricity bill by 15% with these simple, step-by-step DIY air conditioning maintenance tips.",
            content: "<h3>1. Change the Air Filters</h3>\n<p>A dirty filter blocks airflow, forcing your AC unit to work twice as hard. Replace or wash your AC filters every 30 to 90 days. This simple action can lower your system's energy consumption by up to 15%.</p>\n<h3>2. Clean the Condenser Coils</h3>\n<p>The outdoor condenser unit accumulates dirt, leaves, and grass clippings. Shut off the power, and use a garden hose to gently spray down the coils from the inside out. Do not use a pressure washer, as it can bend the delicate aluminum fins.</p>\n<h3>3. Clear the Condensate Drain Line</h3>\n<p>Algae and mold can clog the drain line, causing water to back up and flood your home. Pour a cup of household bleach or white vinegar down the access port to kill any buildup and keep the line flowing.</p>\n<h3>4. Check Vent Clearance</h3>\n<p>Make sure furniture, curtains, and rugs are not blocking supply or return vents. Unobstructed air circulation is critical for efficient cooling.</p>\n<h3>5. When to Call an AC Tech</h3>\n<p>If your AC runs constantly but blows warm air, or if you hear grinding sounds, it is likely low on refrigerant or has a compressor issue. These require certified HVAC technicians to service safely.</p>",
            author: "Robert Chill, AC Specialist",
            category: "AC Repair",
            readTime: "4 min read",
            image: "https://images.unsplash.com/photo-1621905252507-b354bc25edac?w=800&auto=format&fit=crop&q=80",
            createdAt: "2026-06-12T14:00:00Z"
        }
    ],
    contacts: [
        {
            id: "ct_seed1",
            name: "Marcus Aurelius",
            email: "marcus@rome.org",
            subject: "Pest Control corporate account",
            message: "Hello, we are interested in setting up monthly pest control contracts for our three office locations in downtown Seattle. Do you support corporate billing?",
            status: "unread",
            createdAt: "2026-06-14T16:40:00Z"
        }
    ]
};
// Seed the DB
console.log('Seeding database...');
db.reset(seedData);
console.log('Database successfully seeded!');
console.log('Admin account: admin@workxhub.com / admin123');
console.log('Homeowner account: jane@example.com / password123');
console.log('Worker account: plumber@workxhub.com / password123');