export default class RegisterHomeownerView {
    constructor() {
        document.title = "WorkX Hub - Homeowner Registration";
    }

    async getHtml() {
        return `
        <div style="font-family: Arial, sans-serif; padding:40px 20px; max-width:600px; margin:auto;">

            <h1 style="text-align:center; color:#2c3e50;">
                Homeowner Registration
            </h1>

            <p style="text-align:center; color:#7f8c8d; margin-bottom:30px;">
                Register to hire trusted local service professionals.
            </p>

            <form id="homeownerForm"
                style="background:#fff;padding:30px;border-radius:10px;
                box-shadow:0 4px 15px rgba(0,0,0,0.08);">

                <!-- First Name -->
                <div style="margin-bottom:15px;">
                    <label><b>First Name</b></label>
                    <input
                        type="text"
                        id="firstName"
                        placeholder="Enter First Name"
                        required
                        style="width:100%;padding:10px;margin-top:5px;box-sizing:border-box;">
                </div>

                <!-- Last Name -->
                <div style="margin-bottom:15px;">
                    <label><b>Last Name</b></label>
                    <input
                        type="text"
                        id="lastName"
                        placeholder="Enter Last Name"
                        required
                        style="width:100%;padding:10px;margin-top:5px;box-sizing:border-box;">
                </div>

                <!-- Mobile Number -->
                <div style="margin-bottom:15px;">
                    <label><b>Mobile Number</b></label>

                    <div style="display:flex;gap:10px;margin-top:5px;">
                        <input
                            type="tel"
                            id="mobile"
                            placeholder="9876543210"
                            maxlength="10"
                            required
                            style="flex:1;padding:10px;">

                        <button
                            type="button"
                            id="sendOtpBtn"
                            style="background:#3498db;color:white;
                            border:none;padding:10px 15px;
                            border-radius:5px;cursor:pointer;">
                            Send OTP
                        </button>
                    </div>
                </div>

                <!-- OTP -->
                <div style="margin-bottom:15px;">
                    <label><b>OTP Verification</b></label>

                    <div style="display:flex;gap:10px;margin-top:5px;">
                        <input
                            type="text"
                            id="otp"
                            placeholder="Enter OTP"
                            maxlength="6"
                            required
                            style="flex:1;padding:10px;">

                        <button
                            type="button"
                            id="verifyOtpBtn"
                            style="background:#27ae60;color:white;
                            border:none;padding:10px 15px;
                            border-radius:5px;cursor:pointer;">
                            Verify
                        </button>
                    </div>
                </div>

                <!-- Age -->
                <div style="margin-bottom:15px;">
                    <label><b>Age</b></label>
                    <input
                        type="number"
                        id="age"
                        min="18"
                        placeholder="Enter Age"
                        required
                        style="width:100%;padding:10px;margin-top:5px;box-sizing:border-box;">
                </div>

                <!-- Gender -->
                <div style="margin-bottom:15px;">
                    <label><b>Gender</b></label>

                    <select
                        id="gender"
                        required
                        style="width:100%;padding:10px;margin-top:5px;">
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
                </div>

                <!-- Aadhaar -->
                <div style="margin-bottom:15px;">
                    <label><b>Aadhaar Number</b></label>
                    <input
                        type="text"
                        id="aadhaar"
                        maxlength="12"
                        placeholder="Enter 12 Digit Aadhaar Number"
                        required
                        style="width:100%;padding:10px;margin-top:5px;box-sizing:border-box;">
                </div>

                <!-- Selfie Capture -->
                <div style="margin-bottom:20px;">
                    <label><b>Live Selfie Verification</b></label>

                    <video
                        id="video"
                        autoplay
                        playsinline
                        width="100%"
                        height="250"
                        style="margin-top:10px;border:1px solid #ddd;border-radius:8px;background:#000;">
                    </video>

                    <canvas id="canvas" style="display:none;"></canvas>

                    <button
                        type="button"
                        id="captureBtn"
                        style="margin-top:10px;width:100%;
                        background:#f39c12;color:white;
                        border:none;padding:12px;
                        border-radius:5px;cursor:pointer;">
                        Capture Selfie
                    </button>

                    <img
                        id="photoPreview"
                        alt="Selfie Preview"
                        style="display:none;width:100%;
                        margin-top:10px;border-radius:8px;">
                </div>

                <!-- Terms -->
                <div style="margin-bottom:20px;">
                    <label>
                        <input type="checkbox" id="terms" required>
                        I agree to the Terms & Conditions and Privacy Policy
                    </label>
                </div>

                <!-- Submit -->
                <button
                    type="submit"
                    style="width:100%;
                    background:#3498db;
                    color:white;
                    border:none;
                    padding:14px;
                    border-radius:5px;
                    font-size:16px;
                    cursor:pointer;">
                    Create Account
                </button>

                <p style="text-align:center;margin-top:15px;">
                    Already have an account?
                    <a href="/login">Login Here</a>
                </p>

            </form>
        </div>
        `;
    }

    afterRender() {

        let otpVerified = false;
        let selfieCaptured = false;

        // Start Camera
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(stream => {
                const video = document.getElementById("video");
                if (video) {
                    video.srcObject = stream;
                }
            })
            .catch(() => {
                alert("Unable to access camera.");
            });

        // Send OTP (Demo)
        document.getElementById("sendOtpBtn")?.addEventListener("click", () => {
            alert("Demo OTP Sent Successfully");
        });

        // Verify OTP (Demo)
        document.getElementById("verifyOtpBtn")?.addEventListener("click", () => {
            otpVerified = true;
            alert("OTP Verified Successfully");
        });

        // Capture Selfie
        document.getElementById("captureBtn")?.addEventListener("click", () => {

            const video = document.getElementById("video");
            const canvas = document.getElementById("canvas");
            const preview = document.getElementById("photoPreview");

            const ctx = canvas.getContext("2d");

            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;

            ctx.drawImage(video, 0, 0);

            const image = canvas.toDataURL("image/png");

            preview.src = image;
            preview.style.display = "block";

            selfieCaptured = true;

            alert("Selfie Captured Successfully");
        });

        // Form Submit
        document.getElementById("homeownerForm")?.addEventListener("submit", (e) => {

            e.preventDefault();

            if (!otpVerified) {
                alert("Please verify your OTP first.");
                return;
            }

            if (!selfieCaptured) {
                alert("Please capture your selfie.");
                return;
            }

            alert("Homeowner Registration Successful!");

            // Redirect Example
            // window.location.href = "/homeowner-dashboard";
        });
    }
}