export default class ContactView {
    constructor() {
        document.title = "WorkX Hub - Contact Us";
    }

    async getHtml() {
        return `
            <div style="font-family: Arial, sans-serif; padding: 40px 20px; max-width: 500px; margin: 0 auto; color: #333;">
                <h1 style="color: #2c3e50; text-align: center;">Get in Touch</h1>
                <p style="text-align: center; color: #7f8c8d; margin-bottom: 30px;">Have questions or feedback? Leave us a message below.</p>
                
                <form style="background: white; padding: 30px; border-radius: 8px; box-shadow: 0 4px 10px rgba(0,0,0,0.05);">
                    <div style="margin-bottom: 15px;">
                        <label style="display: block; font-weight: bold; margin-bottom: 5px;">Your Name</label>
                        <input type="text" placeholder="Alex Johnson" style="width: 100%; padding: 10px; border: 1px solid #ccc; border-radius: 4px; box-sizing: border-box;">
                    </div>
                    <div style="margin-bottom: 15px;">
                        <label style="display: block; font-weight: bold; margin-bottom: 5px;">Email Address</label>
                        <input type="email" placeholder="alex@example.com" style="width: 100%; padding: 10px; border: 1px solid #ccc; border-radius: 4px; box-sizing: border-box;">
                    </div>
                    <div style="margin-bottom: 20px;">
                        <label style="display: block; font-weight: bold; margin-bottom: 5px;">Message</label>
                        <textarea placeholder="How can we help you?" rows="5" style="width: 100%; padding: 10px; border: 1px solid #ccc; border-radius: 4px; box-sizing: border-box; resize: vertical;"></textarea>
                    </div>
                    <button type="button" style="width: 100%; background: #3498db; color: white; padding: 12px; border: none; border-radius: 4px; font-weight: bold; cursor: pointer;">Send Message</button>
                </form>
            </div>
        `;
    }
}