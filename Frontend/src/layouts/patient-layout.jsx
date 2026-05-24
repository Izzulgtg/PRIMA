import { Outlet, NavLink } from "react-router-dom"

function PatientLayout() {
    return (
        <div className="min-h-screen flex bg-prima-background">

            {/* SIDEBAR */}
            <aside className="w-64 bg-prima-card border-r border-[#E5E7EB] flex flex-col">

                {/* Logo */}
                <div className="h-16 flex items-center px-6 border-b border-[#E5E7EB]">
                    <h1 className="text-2xl font-bold text-prima-green tracking-wide">
                        <a href="#">PRIMA</a>
                    </h1>
                </div>

                {/* Navigation */}
                <nav className="flex flex-col gap-2 p-4">

                    {/* Dashboard */}
                    <NavLink
                        to="/patient/dashboard"
                        className={({ isActive }) =>
                            `px-4 py-3 rounded-xl transition-all duration-200 ${
                                isActive
                                    ? "bg-prima-green text-white font-semibold shadow-sm"
                                    : "text-prima-text hover:bg-prima-sand"
                            }`
                        }
                    >
                        Dashboard
                    </NavLink>

                    {/* Appointment */}
                    <NavLink
                        to="/patient/appointment"
                        className={({ isActive }) =>
                            `px-4 py-3 rounded-xl transition-all duration-200 ${
                                isActive
                                    ? "bg-prima-green text-white font-semibold shadow-sm"
                                    : "text-prima-text hover:bg-prima-sand"
                            }`
                        }
                    >
                        Appointment
                    </NavLink>

                    {/* Consultation */}
                    <NavLink
                        to="/patient/consultation"
                        className={({ isActive }) =>
                            `px-4 py-3 rounded-xl transition-all duration-200 ${
                                isActive
                                    ? "bg-prima-green text-white font-semibold shadow-sm"
                                    : "text-prima-text hover:bg-prima-sand"
                            }`
                        }
                    >
                        Consultation
                    </NavLink>

                    {/* Medical History */}
                    <NavLink
                        to="/patient/medical-history"
                        className={({ isActive }) =>
                            `px-4 py-3 rounded-xl transition-all duration-200 ${
                                isActive
                                    ? "bg-prima-green text-white font-semibold shadow-sm"
                                    : "text-prima-text hover:bg-prima-sand"
                            }`
                        }
                    >
                        Medical History
                    </NavLink>
                    
                    {/* Medicine History */}
                    <NavLink
                        to="/patient/medicine-history"
                        className={({ isActive }) =>
                            `px-4 py-3 rounded-xl transition-all duration-200 ${
                                isActive
                                    ? "bg-prima-green text-white font-semibold shadow-sm"
                                    : "text-prima-text hover:bg-prima-sand"
                            }`
                        }
                    >
                        Medicine History
                    </NavLink>

                    {/* Profile */}
                    <NavLink
                        to="/patient/profile"
                        className={({ isActive }) =>
                            `px-4 py-3 rounded-xl transition-all duration-200 ${
                                isActive
                                    ? "bg-prima-green text-white font-semibold shadow-sm"
                                    : "text-prima-text hover:bg-prima-sand"
                            }`
                        }
                    >
                        Profile
                    </NavLink>

                    {/* Security */}
                    <NavLink
                        to="/patient/security"
                        className={({ isActive }) =>
                            `px-4 py-3 rounded-xl transition-all duration-200 ${
                                isActive
                                    ? "bg-prima-green text-white font-semibold shadow-sm"
                                    : "text-prima-text hover:bg-prima-sand"
                            }`
                        }
                    >
                        Security
                    </NavLink>

                </nav>
            </aside>

            {/* CONTENT AREA */}
            <div className="flex-1 flex flex-col">

                {/* NAVBAR */}
                <header className="h-16 bg-prima-card border-b border-[#E5E7EB] flex items-center justify-between px-6">

                    {/* Left Side */}
                    <div>
                        <h2 className="text-lg font-semibold text-prima-text">
                            Patient Dashboard
                        </h2>

                        <p className="text-sm text-prima-muted">
                            Manage your appointments and consultations
                        </p>
                    </div>

                    {/* Right Side */}
                    <div className="flex items-center gap-3">

                        {/* Avatar */}
                        <div className="w-10 h-10 rounded-full bg-prima-green flex items-center justify-center text-white font-semibold">
                            P
                        </div>

                        {/* User Info */}
                        <div>
                            <p className="text-sm font-medium text-prima-text">
                                Welcome Back
                            </p>

                            <p className="text-xs text-prima-muted">
                                Patient Account
                            </p>
                        </div>

                    </div>
                </header>

                {/* MAIN CONTENT */}
                <main className="flex-1 p-6 overflow-y-auto">
                    <Outlet />
                </main>

            </div>
        </div>
    )
}

export default PatientLayout