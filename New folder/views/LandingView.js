export default class LandingView {
    constructor() {
        document.title = "WorkX Hub - Home";
    }

    async getHtml() {
        return `
        <div style="
            font-family:'Segoe UI', Arial, sans-serif;
            background:#f8fafc;
            min-height:100vh;
        ">

            <!-- HERO SECTION -->
            <section style="
                max-width:1200px;
                margin:0 auto;
                padding:80px 30px;
                display:flex;
                align-items:center;
                justify-content:space-between;
                gap:50px;
                flex-wrap:wrap;
            ">

                <div style="flex:1; min-width:320px;">

                    <span style="
                        background:#dbeafe;
                        color:#2563eb;
                        padding:8px 16px;
                        border-radius:30px;
                        font-size:14px;
                        font-weight:bold;
                    ">
                        🇮🇳 Trusted Across India
                    </span>

                    <h1 style="
                        font-size:3.8rem;
                        line-height:1.1;
                        color:#0f172a;
                        margin:25px 0;
                        font-weight:800;
                    ">
                        India's No.1 Local Service App
                    </h1>

                    <p style="
                        font-size:1.15rem;
                        color:#64748b;
                        line-height:1.8;
                        max-width:650px;
                    ">
                        Find trusted plumbers, electricians,
                        carpenters, painters, drivers,
                        cleaners and skilled workers near you.
                        Fast booking, verified professionals
                        and reliable service.
                    </p>

                    <div style="
                        display:flex;
                        gap:15px;
                        margin-top:35px;
                        flex-wrap:wrap;
                    ">
                        <a href="#/register-homeowner"
                            style="
                            background:#2563eb;
                            color:white;
                            text-decoration:none;
                            padding:15px 28px;
                            border-radius:12px;
                            font-weight:700;
                            display:inline-block;
                        ">
                            Join as Homeowner
                        </a>

                        <a href="#/register-worker"
                            style="
                            background:#2ea92a;
                            color:White;
                            text-decoration:none;
                            padding:15px 28px;
                            border-radius:12px;
                            border:2px solid #f1faf1;
                            font-weight:700;
                            display:inline-block;
                        ">
                            Join as Worker
                        </a>
                    </div>

                    <div style="
                        display:flex;
                        gap:30px;
                        margin-top:40px;
                        flex-wrap:wrap;
                    ">
                        <div>
                            <h2 style="margin:0;color:#2563eb;">10K+</h2>
                            <p style="margin:0;color:#64748b;">Verified Workers</p>
                        </div>

                        <div>
                            <h2 style="margin:0;color:#2563eb;">5K+</h2>
                            <p style="margin:0;color:#64748b;">Happy Customers</p>
                        </div>

                        <div>
                            <h2 style="margin:0;color:#2563eb;">50+</h2>
                            <p style="margin:0;color:#64748b;">Services</p>
                        </div>
                    </div>

                </div>

<!-- HERO IMAGE -->
<div style="
    flex:1;
    min-width:320px;
    display:flex;
    justify-content:center;
    align-items:center;
">

    <div style="
        position:relative;
        width:500px;
        height:500px;
    ">

        <!-- Background Circle -->
        <div style="
            position:absolute;
            width:420px;
            height:420px;
            background:#dbeafe;
            border-radius:50%;
            top:40px;
            left:40px;
        "></div>

        <!-- Phone Mockup -->
        <div style="
            position:absolute;
            left:170px;
            top:3px;
            width:160px;
            height:320px;
            background:white;
            border:10px solid #111827;
            border-radius:30px;
            box-shadow:0 15px 40px rgba(0,0,0,.15);
            z-index:10;
        ">
            <div style="
                height:50px;
                background:#2563eb;
                border-radius:20px 20px 0 0;
                color:white;
                display:flex;
                align-items:center;
                justify-content:center;
                font-weight:bold;
            ">
                WorkX Hub
            </div>

            <div style="padding:15px;">
                <div style="
                    background:#f1f5f9;
                    padding:10px;
                    border-radius:10px;
                    margin-bottom:10px;
                ">
                    🛠️ Electrons Repair
                </div>

                <div style="
                    background:#f1f5f9;
                    padding:10px;
                    border-radius:10px;
                    margin-bottom:10px;
                ">
                    🚗 Driver
                </div>

                <div style="
                    background:#f1f5f9;
                    padding:10px;
                    border-radius:10px;
                ">
                    🎨 Painter
                </div>
            </div>
        </div>

        <!-- Worker 1 -->
        <div style="
            position:absolute;
            left:20px;
            top:130px;
            width:120px;
            height:220px;
            background:white;
            border-radius:20px;
            box-shadow:0 10px 25px rgba(0,0,0,.1);
            text-align:center;
            padding-top:20px;
        ">
            <div style="font-size:60px;">🔧</div>
            <h4>Plumber</h4>
            <p style="font-size:12px;">Verified</p>
        </div>

        <!-- Worker 2 -->
        <div style="
            position:absolute;
            right:20px;
            top:130px;
            width:120px;
            height:220px;
            background:white;
            border-radius:20px;
            box-shadow:0 10px 25px rgba(0,0,0,.1);
            text-align:center;
            padding-top:20px;
        ">
            <div style="font-size:60px;">⚡</div>
            <h4>Electrician</h4>
            <p style="font-size:12px;">Verified</p>
        </div>

        <!-- Worker 3 -->
        <div style="
            position:absolute;
            left:190px;
            bottom:5px;
            width:120px;
            height:207px;
            background:white;
            border-radius:20px;
            box-shadow:0 10px 25px rgba(0,0,0,.1);
            text-align:center;
            padding-top:20px;
        ">
            <div style="font-size:60px;">🧹</div>
            <h4>Home Servicer</h4>
            <p style="font-size:12px;">Verified</p>
        </div>

    </div>
    

        </section>
<!-- SERVICES SECTION -->
<!-- SERVICES SECTION -->
<section style="
    max-width:1200px;
    margin:auto;
    padding:80px 30px;
">

    <div style="text-align:center;margin-bottom:50px;">
        <h2 style="
            font-size:2.8rem;
            color:#0f172a;
            font-weight:800;
            margin-bottom:15px;
        ">
            Our Professional Services
        </h2>

        <p style="
            color:#64748b;
            font-size:1.1rem;
            max-width:700px;
            margin:auto;
        ">
            Verified and trusted professionals ready to serve your home and business needs.
        </p>
    </div>

    <div style="
        display:grid;
        grid-template-columns:repeat(auto-fit,minmax(300px,1fr));
        gap:30px;
    ">

        <!-- PLUMBER -->
        <div style="
            background:white;
            border-radius:20px;
            overflow:hidden;
            box-shadow:0 10px 25px rgba(0,0,0,.08);
        ">
           <img 
           src="https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=800&q=80" 
                alt="Plumber"
                style="
                    width:100%;
                    height:220px;
                    object-fit:cover;
                "
            >

            <div style="padding:25px;">
                <h3>🔧 Plumbing Services</h3>
                <p style="color:#64748b;">
                    Pipe repairs, leakage fixing, bathroom fittings and installations.
                </p>
            </div>
        </div>

        <!-- ELECTRICIAN -->
        <div style="
            background:white;
            border-radius:20px;
            overflow:hidden;
            box-shadow:0 10px 25px rgba(0,0,0,.08);
        ">
            <img
                src="https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=800"
                alt="Electrician"
                style="
                    width:100%;
                    height:220px;
                    object-fit:cover;
                "
            >

            <div style="padding:25px;">
                <h3>⚡ Electrical Services</h3>
                <p style="color:#64748b;">
                    Wiring, installations, switch repairs and maintenance.
                </p>
            </div>
        </div>

        <!-- CARPENTER -->
        <div style="
            background:white;
            border-radius:20px;
            overflow:hidden;
            box-shadow:0 10px 25px rgba(0,0,0,.08);
        ">
            <img
                src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800"
                alt="Carpenter"
                style="
                    width:100%;
                    height:220px;
                    object-fit:cover;
                "
            >

            <div style="padding:25px;">
                <h3>🪚 Carpentry Services</h3>
                <p style="color:#64748b;">
                    Furniture assembly, repairs and custom woodwork.
                </p>
            </div>
        </div>

        <!-- HOUSE SERVICER -->
        <div style="
            background:white;
            border-radius:20px;
            overflow:hidden;
            box-shadow:0 10px 25px rgba(0,0,0,.08);
        ">
            <img
                src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800"
                alt="House Servicer"
                style="
                    width:100%;
                    height:220px;
                    object-fit:cover;
                "
            >

            <div style="padding:25px;">
                <h3>🧹 House Services</h3>
                <p style="color:#64748b;">
                    Housekeeping, cleaning, cooking and daily assistance.
                </p>
            </div>
        </div>

        <!-- DRIVER -->
        <div style="
            background:white;
            border-radius:20px;
            overflow:hidden;
            box-shadow:0 10px 25px rgba(0,0,0,.08);
        ">
            <img
                src="https://images.unsplash.com/photo-1551830820-330a71b99659?w=800"
                alt="Driver"
                style="
                    width:100%;
                    height:220px;
                    object-fit:cover;
                "
            >

            <div style="padding:25px;">
                <h3>🚗 Driver Services</h3>
                <p style="color:#64748b;">
                    Personal, family and corporate driver services.
                </p>
            </div>
        </div>

        <!-- PAINTER -->
        <div style="
            background:white;
            border-radius:20px;
            overflow:hidden;
            box-shadow:0 10px 25px rgba(0,0,0,.08);
        ">
            <img
                src="https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=800"
                alt="Painter"
                style="
                    width:100%;
                    height:220px;
                    object-fit:cover;
                "
            >

            <div style="padding:25px;">
                <h3>🎨 Painting Services</h3>
                <p style="color:#64748b;">
                    Interior painting, exterior painting and wall finishing.
                </p>
            </div>
        </div>

</section>
        <!-- FOOTER -->
        <footer style="
            margin-top:60px;
            background:#0f172a;
            color:white;
            text-align:center;
            padding:30px;
        ">
            <h3>WorkX Hub</h3>
            <p>Trusted Workers. Happy Homes.</p>
        </footer>

    </div>
    `;
}
}