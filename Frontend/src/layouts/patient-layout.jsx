import { Outlet, NavLink } from "react-router-dom"

import {
    LayoutDashboard,
    CalendarDays,
    MessageCircle,
    FileText,
    User,
    ShieldCheck,
    Bell,
    LogOut,
} from "lucide-react"

function PatientLayout() {

    const user = JSON.parse(localStorage.getItem("user"));
    const initial = user?.nama_lengkap?.charAt(0)?.toUpperCase() || "P";

    

    const navClass = ({ isActive }) =>
        `flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300 ${
            isActive
                ? "bg-prima-green text-white font-semibold shadow-sm"
                : "text-prima-text hover:bg-prima-sand"
        }`

    return (
        <div className="h-screen flex bg-prima-background overflow-hidden">

            {/* CONTENT AREA */}
            <div className="flex-1 flex flex-col overflow-hidden">

                {/* NAVBAR */}
                <header className="h-16 bg-prima-card border-b border-[#E5E7EB] flex items-center justify-between px-6">

                    {/* Logo */}
                    <div className="h-16 flex items-center px-6 border-b border-[#E5E7EB]">

                        <h1 className="text-3xl font-bold text-prima-green tracking-wide">
                            PRIMA
                        </h1>

                    </div>

                    {/* Left Side */}
                    <div>

                        <p className="text-sm text-prima-secondary">
                            PRIMA Healthcare System
                        </p>

                        <h2 className="text-xl font-bold text-prima-text">
                            Patient Dashboard
                        </h2>

                    </div>

                    {/* Right Side */}
                    <div className="flex items-center gap-4">

                        {/* Notification */}
                        <button className="w-10 h-10 rounded-full bg-prima-background flex items-center justify-center hover:bg-prima-sand transition-all duration-300">

                            <Bell size={18} className="text-prima-text" />

                        </button>

                        {/* User */}
                        <div className="flex items-center gap-3">

                            {/* Avatar */}
                            <div className="w-10 h-10 rounded-full bg-prima-green flex items-center justify-center text-white font-semibold">
                                {initial}
                            </div>

                            {/* User Info */}
                            <div>

                                <p className="text-sm font-medium text-prima-text">
                                    Welcome Back
                                </p>

                                <p className="text-xs text-prima-secondary">
                                    Patient Account
                                </p>

                            </div>

                        </div>

                    </div>

                </header>

                {/* MAIN CONTENT */}
                <main className="flex-1 overflow-y-auto p-6">

                    <Outlet />

                </main>

            </div>

        </div>
    )
}

export default PatientLayout