import { Outlet, NavLink } from "react-router-dom";
function DoctorLayout() {
    const menus = [
        {
            label: "Dashboard",
            path: "/doctor/dashboard",
        },
        {
            label: "Pemeriksaan",
            path: "/doctor/examination",
        },
        {
            label: "Konsultasi",
            path: "/doctor/consultation",
        },
        {
            label: "Jadwal",
            path: "/doctor/schedule",
        },
        {
            label: "Obat",
            path: "/doctor/medicine",
        },
        {
            label: "Rekam Medis",
            path: "/doctor/medical-records",
        },
        {
            label: "Monitoring",
            path: "/doctor/monitoring",
        },
    ];
    return (
        <div className="flex min-h-screen bg-prima-cream text-prima-black">
            <aside className="w-72 bg-white px-6 py-6 shadow-sm">
                <div>
                    <p className="text-sm font-medium text-prima-teal">
                        PRIMA Doctor
                    </p>

                    <h1 className="mt-2 text-2xl font-semibold text-prima-black">
                        Panel Dokter
                    </h1>

                    <p className="mt-2 text-sm text-prima-gray">
                        Kelola antrian, pemeriksaan, konsultasi, dan rekam medis pasien.
                    </p>
                </div>
                <nav className="mt-8 space-y-2">
                    {menus.map((menu) => (
                        <NavLink
                            key={menu.path}
                            to={menu.path}
                            className={({ isActive }) =>
                                `block rounded-2xl px-4 py-3 text-sm font-medium transition ${isActive
                                    ? "bg-prima-green text-white"
                                    : "text-prima-gray hover:bg-prima-sand hover:text-prima-black"
                                }`
                            }
                        >
                            {menu.label}
                        </NavLink>
                    ))}
                </nav>
            </aside>

            <main className="flex-1 overflow-y-auto">
                <Outlet />
            </main>
        </div>
    );
}

export default DoctorLayout;