export default class HomeownerDashboardView {
    constructor() {
        document.title = "WorkX Hub - Homeowner Dashboard";
    }

    async getHtml() {
        return `
            <div style="font-family: Arial, sans-serif; padding: 30px 20px; max-width: 1000px; margin: 0 auto; color: #333;">
                <div style="background: #3498db; color: white; padding: 20px; border-radius: 8px; margin-bottom: 30px;">
                    <h2>Welcome Back, Jane! (Homeowner)</h2>
                    <p>Manage your bookings, view local handymen, and track project statuses.</p>
                </div>
                
                <h3 style="color: #2c3e50; margin-bottom: 15px;">Your Active Bookings</h3>
                <div style="background: white; padding: 20px; border-radius: 8px; border: 1px solid #e0e0e0; display: flex; justify-content: space-between; align-items: center;">
                    <div>
                        <strong style="font-size: 1.1rem; color: #2c3e50;">Kitchen Sink Pipe Leak Fix</strong>
                        <p style="color: #7f8c8d; margin: 5px 0 0 0;">Worker: Plumber John • Date: 2026-06-20 at 10:00 AM</p>
                    </div>
                    <span style="background: #f39c12; color: white; padding: 6px 12px; border-radius: 20px; font-size: 0.85rem; font-weight: bold;">PENDING APPROVAL</span>
                </div>
            </div>
        `;
    }
}