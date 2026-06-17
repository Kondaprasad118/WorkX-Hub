export default class BookWorkerView {
    constructor() {
        document.title = "WorkX Hub - Schedule a Booking";
    }

    async getHtml() {
        return `
            <div style="font-family: Arial, sans-serif; padding: 40px 20px; max-width: 500px; margin: 0 auto; color: #333;">
                <h1 style="color: #2c3e50; text-align: center; margin-bottom: 30px;">Book a Service Professional</h1>
                
                <form style="background: white; padding: 30px; border-radius: 8px; box-shadow: 0 4px 10px rgba(0,0,0,0.05);">
                    <div style="margin-bottom: 15px;">
                        <label style="display: block; font-weight: bold; margin-bottom: 5px;">Select Date</label>
                        <input type="date" style="width: 100%; padding: 10px; border: 1px solid #ccc; border-radius: 4px; box-sizing: border-box;">
                    </div>
                    <div style="margin-bottom: 15px;">
                        <label style="display: block; font-weight: bold; margin-bottom: 5px;">Preferred Arrival Time</label>
                        <input type="time" style="width: 100%; padding: 10px; border: 1px solid #ccc; border-radius: 4px; box-sizing: border-box;">
                    </div>
                    <div style="margin-bottom: 20px;">
                        <label style="display: block; font-weight: bold; margin-bottom: 5px;">Describe the Problem</label>
                        <textarea placeholder="Please describe what needs fixing in detail..." rows="4" style="width: 100%; padding: 10px; border: 1px solid #ccc; border-radius: 4px; box-sizing: border-box; resize: none;"></textarea>
                    </div>
                    <button type="button" style="width: 100%; background: #3498db; color: white; padding: 12px; border: none; border-radius: 4px; font-weight: bold; cursor: pointer;">Confirm & Send Request</button>
                </form>
            </div>
        `;
    }
}