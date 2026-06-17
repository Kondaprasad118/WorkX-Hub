import { translations } from '../translations.js';

export default class RegisterWorkerView {
    constructor() {
        document.title = "WorkX Hub - Register as Worker";
        this.currentLang = localStorage.getItem('selectedLang') || 'en';
        this.stream = null; // Holds the camera stream reference
    }

    async getHtml() {
        return `
            <div style="font-family: Arial, sans-serif; padding: 40px 20px; max-width: 550px; margin: 0 auto; color: #333;">
                <h1 style="color: #2c3e50; text-align: center; margin-bottom: 10px; font-size: 1.8rem;">Service Worker Onboarding</h1>
                <p style="text-align: center; color: #7f8c8d; margin-bottom: 30px;">Verify your credentials and set up your professional profile.</p>
                
                <form id="worker-reg-form" style="background: white; padding: 30px; border-radius: 8px; box-shadow: 0 4px 10px rgba(0,0,0,0.05); border: 1px solid #e0e0e0;">
                    
                    <h3 style="color: #34495e; border-bottom: 1px solid #eee; padding-bottom: 8px; margin-bottom: 15px;">1. Personal Information</h3>
                    
                    <div style="display: flex; gap: 15px; margin-bottom: 15px;">
                        <div style="flex: 1;">
                            <label style="display: block; font-weight: bold; margin-bottom: 5px; font-size: 0.9rem;">First Name</label>
                            <input type="text" placeholder="John" required style="width: 100%; padding: 10px; border: 1px solid #ccc; border-radius: 4px; box-sizing: border-box;">
                        </div>
                        <div style="flex: 1;">
                            <label style="display: block; font-weight: bold; margin-bottom: 5px; font-size: 0.9rem;">Last Name</label>
                            <input type="text" placeholder="Doe" required style="width: 100%; padding: 10px; border: 1px solid #ccc; border-radius: 4px; box-sizing: border-box;">
                        </div>
                    </div>

                    <div style="display: flex; gap: 15px; margin-bottom: 15px;">
                        <div style="flex: 1;">
                            <label style="display: block; font-weight: bold; margin-bottom: 5px; font-size: 0.9rem;">Age</label>
                            <input type="number" min="18" max="90" placeholder="25" required style="width: 100%; padding: 10px; border: 1px solid #ccc; border-radius: 4px; box-sizing: border-box;">
                        </div>
                        <div style="flex: 1;">
                            <label style="display: block; font-weight: bold; margin-bottom: 5px; font-size: 0.9rem;">Gender</label>
                            <select required style="width: 100%; padding: 10px; border: 1px solid #ccc; border-radius: 4px; box-sizing: border-box; height: 40px; background: white;">
                                <option value="" disabled selected>Select Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                    </div>

                    <div style="margin-bottom: 20px;">
                        <label style="display: block; font-weight: bold; margin-bottom: 5px; font-size: 0.9rem;">Mobile Number</label>
                        <div style="display: flex; gap: 10px;">
                            <input type="tel" id="worker-phone" placeholder="Enter 10-digit mobile" style="flex: 1; padding: 10px; border: 1px solid #ccc; border-radius: 4px; box-sizing: border-box;">
                            <button type="button" id="btn-send-otp" style="background: #3498db; color: white; border: none; padding: 0 15px; border-radius: 4px; font-weight: bold; cursor: pointer; font-size: 0.85rem;">Send OTP</button>
                        </div>
                    </div>

                    <div id="otp-verification-box" style="display: none; background: #f8f9fa; padding: 15px; border-radius: 6px; border: 1px dashed #3498db; margin-bottom: 20px;">
                        <label style="display: block; font-weight: bold; margin-bottom: 5px; font-size: 0.85rem; color: #2c3e50;">Enter 4-Digit OTP</label>
                        <div style="display: flex; gap: 10px;">
                            <input type="text" id="otp-input" placeholder="XXXX" maxLength="4" style="width: 100px; padding: 8px; text-align: center; border: 1px solid #ccc; border-radius: 4px; letter-spacing: 4px; font-weight: bold;">
                            <button type="button" id="btn-verify-otp" style="background: #2ecc71; color: white; border: none; padding: 0 15px; border-radius: 4px; font-weight: bold; cursor: pointer; font-size: 0.85rem;">Verify OTP</button>
                        </div>
                        <span id="otp-status" style="display:block; font-size:0.8rem; margin-top:5px; font-weight:bold;"></span>
                    </div>
                    

                    <h3 style="color: #34495e; border-bottom: 1px solid #eee; padding-bottom: 8px; margin-top: 25px; margin-bottom: 15px;">2. Identity Verification</h3>
                    
                    <div style="margin-bottom: 15px;">
                        <label style="display: block; font-weight: bold; margin-bottom: 5px; font-size: 0.9rem;">Aadhaar Card Number</label>
                        <input type="text" id="aadhaar-input" placeholder="XXXX XXXX XXXX" maxLength="14" style="width: 100%; padding: 10px; border: 1px solid #ccc; border-radius: 4px; box-sizing: border-box; letter-spacing: 1px;">
                    </div>

                    <div style="margin-bottom: 25px;">
                        <label style="display: block; font-weight: bold; margin-bottom: 5px; font-size: 0.9rem;">Live Profile Photo Capture</label>
                        
                        <div style="position: relative; width: 100%; max-width: 320px; height: 240px; background: #e0e0e0; border-radius: 6px; overflow: hidden; margin: 10px auto; display: flex; align-items: center; justify-content: center; border: 2px solid #ddd;">
                            <video id="camera-feed" autoplay playsinline style="width: 100%; height: 100%; object-fit: cover; display: none;"></video>
                            <img id="photo-preview" style="width: 100%; height: 100%; object-fit: cover; display: none;" />
                            <div id="camera-placeholder" style="text-align: center; color: #7f8c8d; font-size: 0.85rem; padding: 10px;">
                                <span style="font-size: 2.5rem; display: block; margin-bottom: 5px;">📷</span> Camera Stream Inactive
                            </div>
                        </div>

                        <div style="display: flex; justify-content: center; gap: 10px; margin-top: 10px;">
                            <button type="button" id="btn-start-camera" style="background: #34495e; color: white; border: none; padding: 8px 14px; border-radius: 4px; cursor: pointer; font-size: 0.8rem; font-weight: bold;">Start Camera</button>
                            <button type="button" id="btn-capture-photo" disabled style="background: #e67e22; color: white; border: none; padding: 8px 14px; border-radius: 4px; cursor: pointer; font-size: 0.8rem; font-weight: bold; opacity: 0.5;">Capture Snapshot</button>
                        </div>
                        <canvas id="hidden-canvas" style="display: none;" width="640" height="480"></canvas>
                    </div>

                    <h3 style="color: #34495e; border-bottom: 1px solid #eee; padding-bottom: 8px; margin-top: 25px; margin-bottom: 15px;">3. Service Details</h3>
                    
                    <div style="margin-bottom: 15px;">
                        <label style="display: block; font-weight: bold; margin-bottom: 5px; font-size: 0.9rem;">Skill Category</label>
                        <select style="width: 100%; padding: 10px; border: 1px solid #ccc; border-radius: 4px; box-sizing: border-box; height: 40px; background: white;">
                            <option>Plumber</option>
                            <option>Electrician</option>
                            <option>Carpenter</option>
                            <option>Painter</option>
                            <option>House Servicer (Cleaning, Cooking,etc)</option>
                            <option>Driver</option>
                            <option>Electrons Repair</option>
                        </select>
                    </div>
                    
                    <div style="margin-bottom: 15px;">
                        <label style="display: block; font-weight: bold; margin-bottom: 5px; font-size: 0.9rem;">Years of Experience</label>
                        <input type="number" placeholder="5" style="width: 100%; padding: 10px; border: 1px solid #ccc; border-radius: 4px; box-sizing: border-box;">
                    </div>
                    
                    <div style="margin-bottom: 20px;">
                        <label style="display: block; font-weight: bold; margin-bottom: 5px; font-size: 0.9rem;">Short Bio / Summary</label>
                        <textarea placeholder="Tell clients about your work quality..." rows="3" style="width: 100%; padding: 10px; border: 1px solid #ccc; border-radius: 4px; box-sizing: border-box; resize: none;"></textarea>
                    </div>
                    
                    <button type="button" id="btn-submit-worker" style="width: 100%; background: #2ecc71; color: white; padding: 14px; border: none; border-radius: 4px; font-weight: bold; cursor: pointer; font-size: 1rem;">Join as Worker</button>
                </form>
            </div>
        `;
    }

    initEvents() {
        // --- 1. OTP SIMULATION EVENTS ---
        const btnSendOtp = document.getElementById('btn-send-otp');
        const otpBox = document.getElementById('otp-verification-box');
        const btnVerifyOtp = document.getElementById('btn-verify-otp');
        const otpInput = document.getElementById('otp-input');
        const otpStatus = document.getElementById('otp-status');
        const phoneInput = document.getElementById('worker-phone');

        if (btnSendOtp && otpBox) {
            btnSendOtp.addEventListener('click', () => {
                if (!phoneInput.value.trim()) {
                    alert('Please enter a valid mobile number first.');
                    return;
                }
                otpBox.style.display = 'block';
                otpStatus.style.color = '#e67e22';
                otpStatus.innerText = '✨ Simulated OTP code [1234] generated!';
            });
        }

        if (btnVerifyOtp && otpInput && otpStatus) {
            btnVerifyOtp.addEventListener('click', () => {
                if (otpInput.value === '1234') {
                    otpStatus.style.color = '#2ecc71';
                    otpStatus.innerText = '✅ Mobile number verified successfully!';
                    btnSendOtp.disabled = true;
                    btnSendOtp.style.background = '#7f8c8d';
                    otpInput.disabled = true;
                    btnVerifyOtp.disabled = true;
                } else {
                    otpStatus.style.color = '#08711f';
                    otpStatus.innerText = '❌ Invalid code. Try typing 1234.';
                }
            });
        }

        // --- 2. IDENTITY CARD FORMATTING ---
        const aadhaarInput = document.getElementById('aadhaar-input');
        if (aadhaarInput) {
            aadhaarInput.addEventListener('input', (e) => {
                let val = e.target.value.replace(/\D/g, '');
                let formatted = [];
                for (let i = 0; i < val.length && i < 12; i += 4) {
                    formatted.push(val.substring(i, i + 4));
                }
                e.target.value = formatted.join('-');
            });
        }

        // --- 3. HTML5 LIVE CAMERA ACCESS EVENTS ---
        const btnStartCamera = document.getElementById('btn-start-camera');
        const btnCapturePhoto = document.getElementById('btn-capture-photo');
        const videoFeed = document.getElementById('camera-feed');
        const photoPreview = document.getElementById('photo-preview');
        const cameraPlaceholder = document.getElementById('camera-placeholder');
        const hiddenCanvas = document.getElementById('hidden-canvas');

        if (btnStartCamera) {
            btnStartCamera.addEventListener('click', async () => {
                try {
                    photoPreview.style.display = 'none';
                    cameraPlaceholder.style.display = 'none';
                    videoFeed.style.display = 'block';

                    this.stream = await navigator.mediaDevices.getUserMedia({ video: { width: 320, height: 240 } });
                    videoFeed.srcObject = this.stream;
                    
                    btnCapturePhoto.disabled = false;
                    btnCapturePhoto.style.opacity = '1';
                    window.showToast('Camera Connected', 'Live imaging access established successfully.', 'info');
                } catch (err) {
                    console.error('Camera access error:', err);
                    alert('Could not open camera. Please check your system/browser application permissions.');
                    videoFeed.style.display = 'none';
                    cameraPlaceholder.style.display = 'block';
                }
            });
        }

        if (btnCapturePhoto && hiddenCanvas && videoFeed) {
            btnCapturePhoto.addEventListener('click', () => {
                const ctx = hiddenCanvas.getContext('2d');
                ctx.drawImage(videoFeed, 0, 0, hiddenCanvas.width, hiddenCanvas.height);
                const dataUrl = hiddenCanvas.toDataURL('image/png');
                
                videoFeed.style.display = 'none';
                photoPreview.src = dataUrl;
                photoPreview.style.display = 'block';

                if (this.stream) {
                    this.stream.getTracks().forEach(track => track.stop());
                }
                
                btnCapturePhoto.disabled = true;
                btnCapturePhoto.style.opacity = '0.5';
                window.showToast('Snapshot Saved', 'Live physical registration image compiled.', 'success');
            });
        }

// --- 4. SUBMIT SYSTEM ---
const btnSubmit = document.getElementById('btn-submit-worker');

if (btnSubmit) {
    btnSubmit.addEventListener('click', () => {

        const firstName =
            document.querySelector('input[placeholder="John"]')?.value.trim();

        const lastName =
            document.querySelector('input[placeholder="Doe"]')?.value.trim();

        const phone =
            document.getElementById('worker-phone')?.value.trim();

        const aadhaar =
            document.getElementById('aadhaar-input')
                ?.value.replace(/-/g, '')
                .replace(/\s/g, '');

        const skillSelect =
            document.querySelectorAll('select')[1];

        const skill =
            skillSelect?.value;

        const termsAccepted =
            document.getElementById('worker-terms')?.checked;

        const otpVerified =
            document.getElementById('btn-verify-otp')?.disabled;

        const photoPreview =
            document.getElementById('photo-preview');

        const photoCaptured =
            photoPreview &&
            photoPreview.src &&
            photoPreview.src.startsWith('data:image');

        // VALIDATIONS

        if (!firstName) {
            alert('First Name is required');
            return;
        }

        if (!lastName) {
            alert('Last Name is required');
            return;
        }

        if (!phone || phone.length < 10) {
            alert('Enter a valid mobile number');
            return;
        }

        if (!otpVerified) {
            alert('Please verify OTP');
            return;
        }

        if (!aadhaar || aadhaar.length !== 12) {
            alert('Enter a valid 12-digit Aadhaar Number');
            return;
        }

        if (!photoCaptured) {
            alert('Please capture your live selfie');
            return;
        }

        if (!skill) {
            alert('Please select your skill category');
            return;
        }

        if (!termsAccepted) {
            alert('Please accept Terms & Conditions');
            return;
        }

        const workerData = {
            firstName,
            lastName,
            phone,
            aadhaar,
            skill,
            verified: true,
            createdAt: new Date().toISOString()
        };

        console.log('Worker Registration:', workerData);

        window.showToast(
            'Registration Successful',
            'Welcome to WorkX Hub!',
            'success'
        );

        setTimeout(() => {
            window.location.hash = '#/dashboard-worker';
        }, 1500);
    });
}

} 
 
} 