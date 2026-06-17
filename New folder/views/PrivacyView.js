export default class PrivacyView {
    constructor() {
        document.title = "WorkX Hub - Privacy Policy";
    }

    async getHtml() {
        return `
            <div style="font-family: Arial, sans-serif; padding: 40px 20px; max-width: 800px; margin: 0 auto; line-height: 1.6; color: #333;">
                <h1 style="color: #2c3e50; border-bottom: 2px solid #7f8c8d; padding-bottom: 10px;">Privacy Policy</h1>
                <p style="color: #7f8c8d; font-size: 0.9rem;">Last updated: June 15, 2026</p>
                <p style="margin-top: 20px;">
                    At WorkX Hub, we take your privacy seriously. This policy describes how we collect, safeguard, and share your personal information, including names, contact accounts, service choices, and geolocation structures when you register on our platform.
                </p>
                <h3 style="color: #2c3e50; margin-top: 25px;">Data Protection</h3>
                <p>
                    We implement standard hashing encryption routines to secure passwords and user documents. We never sell your tracking information or physical addresses to external marketing groups.
                </p>
            </div>
        `;
    }
}