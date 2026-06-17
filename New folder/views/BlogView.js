export default class BlogView {
    constructor() {
        document.title = "WorkX Hub - Blog";
    }

    async getHtml() {
        return `
            <div style="font-family: Arial, sans-serif; padding: 40px 20px; max-width: 1000px; margin: 0 auto; color: #333;">
                <h1 style="color: #2c3e50; margin-bottom: 30px;">WorkX Hub Insights & Tips</h1>
                
                <div style="background: white; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); margin-bottom: 30px; overflow: hidden; display: flex; flex-direction: column;">
                    <div style="padding: 25px;">
                        <span style="background: #e74c3c; color: white; padding: 4px 8px; font-size: 0.8rem; border-radius: 3px; font-weight: bold;">ELECTRICAL</span>
                        <h2 style="margin: 15px 0 10px 0; color: #2c3e50;">5 Signs Your Home Needs a Professional Electrician</h2>
                        <p style="color: #7f8c8d; margin-bottom: 15px;">Ignoring flickering lights or warm outlets can be incredibly dangerous. Learn exactly when it's time to put down the DIY tools and call a certified technician.</p>
                        <a href="#" style="color: #3498db; font-weight: bold; text-decoration: none;">Read Article →</a>
                    </div>
                </div>
            </div>
        `;
    }
}