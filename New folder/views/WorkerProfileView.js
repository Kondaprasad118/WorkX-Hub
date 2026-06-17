export default class WorkerProfileView {
    constructor() {
        document.title = "WorkX Hub - Worker Profile";
    }

    async getHtml() {
        return `
            <div style="font-family: Arial, sans-serif; padding: 30px 20px; max-width: 700px; margin: 0 auto; color: #333;">
                <div style="background: white; border: 1px solid #e0e0e0; border-radius: 8px; padding: 30px; display: flex; gap: 25px; align-items: center;">
                    <div style="width: 120px; height: 120px; background: #ddd; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 3rem; color: #aaa;">👤</div>
                    <div>
                        <span style="background: #e1f5fe; color: #0288d1; padding: 4px 8px; border-radius: 4px; font-size: 0.8rem; font-weight: bold; text-transform: uppercase;">Verified Plumber</span>
                        <h2 style="margin: 5px 0 10px 0; color: #2c3e50;">Johnathan Doe</h2>
                        <p style="margin: 0 0 10px 0; color: #7f8c8d;">8 Years Experience • ⭐ 4.8 (12 reviews)</p>
                        <p style="margin: 0; font-size: 1.1rem; color: #2ecc71; font-weight: bold;">$45.00 / hour</p>
                    </div>
                </div>
                
                <h3 style="color: #2c3e50; margin-top: 30px;">About Me & Skills</h3>
                <p style="line-height: 1.6; color: #555;">Experienced local plumber specializing in residential leak repairs, fast pipe-fittings, and complex water heater installations.</p>
                <div style="display: flex; gap: 10px; margin-top: 15px;">
                    <span style="background: #f4f4f4; padding: 6px 12px; border-radius: 20px; font-size: 0.9rem;">Pipe Fitting</span>
                    <span style="background: #f4f4f4; padding: 6px 12px; border-radius: 20px; font-size: 0.9rem;">Water Heater Repair</span>
                    <span style="background: #f4f4f4; padding: 6px 12px; border-radius: 20px; font-size: 0.9rem;">Clog Clearing</span>
                </div>
            </div>
        `;
    }
}