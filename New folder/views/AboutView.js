export default class AboutView {
    constructor() {
        document.title = "WorkX Hub - About Us";
    }

    async getHtml() {
        return `
            <div style="font-family: Arial, sans-serif; padding: 40px 20px; max-width: 800px; margin: 0 auto; line-height: 1.6; color: #333;">
                <h1 style="color: #2c3e50; border-bottom: 2px solid #3498db; padding-bottom: 10px;">About WorkX Hub</h1>
                <p style="font-size: 1.1rem; margin-top: 20px;">
                    WorkX Hub bridges the gap between home service seekers and skilled local professionals. Whether you need a top-rated plumber, electrician, carpenter, or cleaner, our mission is to make hiring simple, transparent, and secure.
                </p>
                <h3 style="color: #2c3e50; margin-top: 30px;">Our Core Mission</h3>
                <p>
                    We empower gig workers and local technicians by giving them a professional digital profile to showcase their skills, track fair hourly pricing, and connect directly with verified clients in their city.
                </p>
            </div>
        `;
    }
}