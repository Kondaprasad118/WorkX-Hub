export default class TermsView {
    constructor() {
        document.title = "WorkX Hub - Terms of Service";
    }

    async getHtml() {
        return `
            <div style="font-family: Arial, sans-serif; padding: 40px 20px; max-width: 800px; margin: 0 auto; line-height: 1.6; color: #333;">
                <h1 style="color: #2c3e50; border-bottom: 2px solid #7f8c8d; padding-bottom: 10px;">Terms of Service</h1>
                <p style="color: #7f8c8d; font-size: 0.9rem;">Last updated: June 15, 2026</p>
                <p style="margin-top: 20px;">
                    By creating an account or accessing the system at WorkX Hub, you agree to obey all localized safety codes and complete standard honest pricing negotiations directly inside our platform tracking infrastructure.
                </p>
                <h3 style="color: #2c3e50; margin-top: 25px;">User Conduct Guidelines</h3>
                <p>
                    All home service consumers must provide safe operating workspace environments. Registered service workers are expected to hold correct active certifications corresponding to their displayed work category profile selections.
                </p>
            </div>
        `;
    }
}