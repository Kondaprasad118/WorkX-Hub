import { translations } from '../translations.js';

export default class LoginView {
    constructor() {
        document.title = "WorkX Hub - Login";
        // Default language fallback to English if not set
        this.currentLang = localStorage.getItem('selectedLang') || 'en';
    }

    async getHtml() {
        const t = translations[this.currentLang];

        return `
            <div style="font-family: Arial, sans-serif; padding: 40px 20px; max-width: 400px; margin: 0 auto; color: #333;">
                
                <div style="text-align: right; margin-bottom: 15px;">
                    <label for="lang-select" style="font-size: 0.85rem; font-weight: bold; margin-right: 5px; color: #7f8c8d;">🌐 Language:</label>
                    <select id="lang-select" style="padding: 5px 10px; border-radius: 4px; border: 1px solid #ccc; cursor: pointer;">
                        <option value="en" ${this.currentLang === 'en' ? 'selected' : ''}>English</option>
                        <option value="te" ${this.currentLang === 'te' ? 'selected' : ''}>తెలుగు (Telugu)</option>
                        <option value="hi" ${this.currentLang === 'hi' ? 'selected' : ''}>हिन्दी (Hindi)</option>
                        <option value="ta" ${this.currentLang === 'ta' ? 'selected' : ''}>தமிழ் (Tamil)</option>
                        <option value="kn" ${this.currentLang === 'kn' ? 'selected' : ''}>ಕನ್ನಡ (Kannada)</option>
                        <option value="ml" ${this.currentLang === 'ml' ? 'selected' : ''}>മലയാളം (Malayalam)</option>
                    </select>
                </div>

                <form id="login-form" style="background: white; padding: 30px; border-radius: 8px; box-shadow: 0 4px 10px rgba(0,0,0,0.05);">
                    <h1 style="color: #2c3e50; text-align: center; margin-top: 0; margin-bottom: 30px; font-size: 1.8rem;">${t.title}</h1>
                    
                    <div style="margin-bottom: 15px;">
                        <label style="display: block; font-weight: bold; margin-bottom: 5px;">${t.emailLabel}</label>
                        <input type="email" placeholder="${t.emailPlace}" style="width: 100%; padding: 10px; border: 1px solid #ccc; border-radius: 4px; box-sizing: border-box;">
                    </div>
                    
                    <div style="margin-bottom: 20px;">
                        <label style="display: block; font-weight: bold; margin-bottom: 5px;">${t.passLabel}</label>
                        <input type="password" placeholder="${t.passPlace}" style="width: 100%; padding: 10px; border: 1px solid #ccc; border-radius: 4px; box-sizing: border-box;">
                    </div>
                    
                    <button type="button" style="width: 100%; background: #2c3e50; color: white; padding: 12px; border: none; border-radius: 4px; font-weight: bold; cursor: pointer; margin-bottom: 15px;">${t.signInBtn}</button>
                    
                    <p style="font-size: 0.9rem; text-align: center; color: #7f8c8d; line-height: 1.5;">
                        ${t.noAccount} <br>
                        <a href="#/register-homeowner" style="color: #3498db; text-decoration: none; font-weight: bold;">${t.regHomeowner}</a> | <br>
                        <a href="#/register-worker" style="color: #2ecc71; text-decoration: none; font-weight: bold;">${t.regWorker}</a>
                    </p>
                </form>
            </div>
        `;
    }

    // Attach an event listener once the view renders onto the DOM
    initEvents() {
        const langSelect = document.getElementById('lang-select');
        if (langSelect) {
            langSelect.addEventListener('change', async (e) => {
                const selectedLanguage = e.target.value;
                // Keep selected language remembered even if they refresh the tab
                localStorage.setItem('selectedLang', selectedLanguage);
                this.currentLang = selectedLanguage;
                
                // Re-render the layout dynamically on the page
                const appContainer = document.getElementById('app');
                if (appContainer) {
                    appContainer.innerHTML = await this.getHtml();
                    this.initEvents(); // Re-attach listener to the newly drawn dropdown
                }
            });
        }
    }
}