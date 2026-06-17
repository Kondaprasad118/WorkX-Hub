export default class AdminDashboardView {
    constructor() {
        document.title = "WorkX Hub - Admin Command Center";
    }

    async getHtml() {
        return `
            <div style="font-family: Arial, sans-serif; padding: 30px 20px; max-width: 1000px; margin: 0 auto; color: #333;">
                <h1 style="color: #2c3e50; border-bottom: 2px solid #34495e; padding-bottom: 10px; margin-bottom: 25px;">Admin Command Center</h1>
                
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-bottom: 40px;">
                    <div style="background: #f8f9fa; border: 1px solid #ddd; padding: 20px; border-radius: 6px; text-align: center;">
                        <h4 style="margin: 0; color: #7f8c8d;">Total Registered Users</h4>
                        <p style="font-size: 2rem; font-weight: bold; margin: 10px 0 0 0; color: #2c3e50;">1,240</p>
                    </div>
                    <div style="background: #f8f9fa; border: 1px solid #ddd; padding: 20px; border-radius: 6px; text-align: center;">
                        <h4 style="margin: 0; color: #7f8c8d;">Pending Verifications</h4>
                        <p style="font-size: 2rem; font-weight: bold; margin: 10px 0 0 0; color: #e67e22;">14</p>
                    </div>
                    <div style="background: #f8f9fa; border: 1px solid #ddd; padding: 20px; border-radius: 6px; text-align: center;">
                        <h4 style="margin: 0; color: #7f8c8d;">Unread Complaints</h4>
                        <p style="font-size: 2rem; font-weight: bold; margin: 10px 0 0 0; color: #e74c3c;">3</p>
                    </div>
                </div>
            </div>
        `;
    }
}