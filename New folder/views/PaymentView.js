export default class PaymentView {
    constructor() {
        document.title = "WorkX Hub - Secure Payment";
    }

    async getHtml() {
        return `
            <div style="font-family: Arial, sans-serif; padding: 40px 20px; max-width: 450px; margin: 0 auto; color: #333; text-align: center;">
                <h1 style="color: #2c3e50; margin-bottom: 10px;">Secure Checkout</h1>
                <p style="color: #7f8c8d; margin-bottom: 30px;">Payment summary for services rendered.</p>
                
                <div style="background: white; padding: 25px; border-radius: 8px; box-shadow: 0 4px 10px rgba(0,0,0,0.05); text-align: left; border: 1px solid #e0e0e0;">
                    <h4 style="margin: 0 0 15px 0; color: #2c3e50; border-bottom: 1px solid #eee; padding-bottom: 10px;">Order Summary</h4>
                    <div style="display: flex; justify-content: space-between; margin-bottom: 10px; color: #555;">
                        <span>Plumbing Work (2 hours)</span>
                        <strong>$90.00</strong>
                    </div>
                    <div style="display: flex; justify-content: space-between; margin-bottom: 15px; color: #555;">
                        <span>Platform Processing Fee</span>
                        <strong>$5.00</strong>
                    </div>
                    <div style="display: flex; justify-content: space-between; border-top: 2px dashed #eee; padding-top: 15px; font-size: 1.2rem; color: #2c3e50; font-weight: bold;">
                        <span>Total Due</span>
                        <span style="color: #2ecc71;">$95.00</span>
                    </div>
                    <button type="button" style="width: 100%; background: #2c3e50; color: white; padding: 12px; border: none; border-radius: 4px; font-weight: bold; cursor: pointer; margin-top: 25px;">Pay Now with Card</button>
                </div>
            </div>
        `;
    }
}