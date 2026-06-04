import { Outlet, NavLink, useLocation } from "react-router-dom";

function DoctorLayout() {
  const location = useLocation();

  const menus = [
    { label: "Dashboard", path: "/doctor/dashboard" },
    { label: "Antrian pasien", path: "/doctor/queue" },
    { label: "Jadwal", path: "/doctor/schedule" },
    { label: "Konsultasi", path: "/doctor/consultation" },
    { label: "Monitoring", path: "/doctor/monitoring" },
    { label: "Daftar Pasien", path: "/doctor/medical-records" },
    { label: "Manajemen Obat", path: "/doctor/medicine" },
    { label: "Pemeriksaan", path: "/doctor/examination" },
  ];

  return (
    <div className="flex min-h-screen bg-[#F5F0E8]">
      <aside className="w-64 flex-shrink-0 flex flex-col bg-[#EDE8DC] px-5 py-6">
        <h1 className="text-base font-bold text-[#6B8F71] mb-8">PRIMA</h1>

        <nav className="flex-1 space-y-2">
          {menus.map((menu) => {
            const isCurrentPage =
              location.pathname === menu.path ||
              location.pathname.startsWith(`${menu.path}/`);
            return (
              <NavLink
                key={menu.path}
                to={menu.path}
                className={`block rounded-xl px-4 py-3 text-sm font-semibold transition ${
                  isCurrentPage
                    ? "bg-[#6B8F71] text-white"
                    : "text-[#1E1E1E] hover:bg-white hover:text-[#6B8F71]"
                }`}
              >
                {menu.label}
              </NavLink>
            );
          })}
        </nav>

        <div className="mt-auto text-xs text-[#6B7280] space-y-3">
          <button className="block hover:text-[#6B8F71]">Help Center</button>
          <button className="block hover:text-[#6B8F71]">Logout</button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col">
        <header className="flex h-16 items-center justify-between bg-white px-6 shadow-sm">
          <div className="w-72 rounded-full bg-[#EDE8DC] px-4 py-2">
            <input
              type="text"
              placeholder="Search Patients..."
              className="w-full bg-transparent text-xs text-[#1E1E1E] outline-none placeholder:text-[#6B7280]"
            />
          </div>

          <div className="flex items-center gap-5">
            <div className="h-8 w-8 rounded-full bg-[#EDE8DC]" />
            <div className="text-right">
              <p className="text-xs font-bold text-[#1E1E1E]">Dr. Zeki</p>
              <p className="text-[10px] text-[#6B7280]">Dokter Umum</p>
            </div>
            <div className="h-9 w-9 rounded-full bg-[#EDE8DC]" />
          </div>
        </header>

        <main className="flex-1 overflow-y-auto bg-[#F5F0E8] p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default DoctorLayout;