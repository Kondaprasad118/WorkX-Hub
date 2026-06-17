export default class WorkerDashboardView {
    constructor() {
        document.title = "WorkX Hub - Worker Dashboard";
    }

    async getHtml() {
        return `
            <div style="font-family: Arial, sans-serif; padding: 30px 20px; max-width: 1000px; margin: 0 auto; color: #333;">
                <div style="background: #2ecc71; color: white; padding: 20px; border-radius: 8px; margin-bottom: 30px;">
                    <h2>Professional Workspace (Worker Panel)</h2>
                    <p>Keep your profile active, respond to customer inquiries, and track incoming jobs.</p>
                </div>
                
                <h3 style="color: #2c3e50; margin-bottom: 15px;">New Job Requests</h3>
                <div style="background: white; padding: 20px; border-radius: 8px; border: 1px solid #e0e0e0;">
                    <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 15px;">
                        <div>
                            <strong style="font-size: 1.1rem; color: #2c3e50;">Fixing kitchen sink pipe leak</strong>
                            <p style="color: #7f8c8d; margin: 5px 0 0 0;">Client: Jane Doe • Address: 123 Maple St</p>
                        </div>
                        <span style="color: #2ecc71; font-weight: bold; font-size: 1.2rem;">$45.00/hr</span>
                    </div>
                    <div style="display: flex; gap: 10px;">
                        <button style="background: #2ecc71; color: white; border: none; padding: 8px 16px; border-radius: 4px; font-weight: bold; cursor: pointer;">Accept Job</button>
                        <button style="background: #e74c3c; color: white; border: none; padding: 8px 16px; border-radius: 4px; font-weight: bold; cursor: pointer;">Decline</button>
                    </div>
                </div>
            </div>
        `;
    }
}