import { NavLink, Outlet, Link } from "react-router-dom"; // ✨ PERBAIKAN: Menambahkan Link di sini
import {
  LayoutDashboard,
  ClipboardList,
  CalendarDays,
  MessageSquare,
  Activity,
  Users,
  Pill,
  ChartNoAxesCombined,
  CircleHelp,
  LogOut,
  Bell,
} from "lucide-react";

function DoctorLayout() {
  const menus = [
    {
      label: "Dashboard",
      path: "/doctor/dashboard",
      icon: LayoutDashboard,
    },
    {
      label: "Antrian Pasien",
      path: "/doctor/queue",
      icon: ClipboardList,
    },
    {
      label: "Jadwal",
      path: "/doctor/schedule",
      icon: CalendarDays,
    },
    {
      label: "Konsultasi",
      path: "/doctor/consultation",
      icon: MessageSquare,
    },
    {
      label: "Monitoring",
      path: "/doctor/monitoring",
      icon: Activity,
    },
    {
      label: "Daftar Pasien",
      path: "/doctor/medical-records", // 💡 Catatan: pastikan path ini sama dengan di App.jsx
      icon: Users,
    },
    {
      label: "Manajemen Obat",
      path: "/doctor/medicine",
      icon: Pill,
    },
    {
      label: "Laporan & Statistik",
      path: "/doctor/statistics",
      icon: ChartNoAxesCombined,
    }
  ];

  return (
    <div className="flex min-h-screen bg-[#F7F3EB] text-[#1E1E1E]">
      <aside className="fixed bottom-0 left-0 top-0 z-30 flex w-[240px] flex-col bg-[#ECE8DC] px-6 py-6">
        <h1 className="text-[20px] font-bold tracking-wide text-[#6B8F71]">
          PRIMA
        </h1>

        <nav className="mt-8 flex-1 space-y-1.5">
          {menus.map((menu) => {
            const Icon = menu.icon;

            return (
              <NavLink
                key={menu.path}
                to={menu.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-[10px] px-3 py-3 text-[13px] font-medium transition ${isActive
                    ? "bg-[#6F9A7B] text-white"
                    : "text-[#3F4B4B] hover:bg-white/70"
                  }`
                }
              >
                <Icon size={16} strokeWidth={1.8} />
                <span>{menu.label}</span>
              </NavLink>
            );
          })}
        </nav>

        <div className="space-y-1.5">
          <button className="flex w-full items-center gap-3 rounded-[10px] px-3 py-3 text-[12px] text-[#55636A] hover:bg-white/70">
            <CircleHelp size={16} strokeWidth={1.8} />
            <span>Help Center</span>
          </button>

          <button className="flex w-full items-center gap-3 rounded-[10px] px-3 py-3 text-[12px] text-[#55636A] hover:bg-white/70">
            <LogOut size={16} strokeWidth={1.8} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      <div className="ml-[240px] flex min-h-screen min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-20 flex h-[72px] items-center justify-between border-b border-[#EEEAE3] bg-white px-8">
          <div className="flex h-[34px] w-[280px] items-center rounded-full bg-[#F1EEE7] px-4">
            <input
              type="text"
              placeholder="Search Patients..."
              className="w-full bg-transparent text-[12px] text-[#1E1E1E] outline-none placeholder:text-[#7A8388]"
            />
          </div>

          <div className="flex items-center">
            <button className="relative flex h-9 w-9 items-center justify-center text-[#55636A]">
              <Bell size={17} strokeWidth={1.8} />
              <span className="absolute right-[7px] top-[6px] h-[5px] w-[5px] rounded-full bg-[#C4846A]" />
            </button>

            <div className="mx-5 h-8 w-px bg-[#E8E5DF]" />

            <div className="flex items-center gap-3">
              {/* Sekarang Link ini akan berfungsi dengan aman */}
              <Link to="/doctor/profile" className="dokter-info-link" style={{ textDecoration: 'none', color: 'inherit' }}>
                <div className="nama-dokter text-right">
                  <h4 className="font-bold">Dr. Dila</h4>
                  <p className="text-xs text-gray-500">Dokter Umum</p>
                </div>
              </Link>

              <img
                src="https://i.pravatar.cc/100?img=12"
                alt="Dr. Dila"
                className="h-10 w-10 rounded-full border-2 border-[#E4E5E1] object-cover cursor-pointer"
              />
            </div>
          </div>
        </header>

        <main className="flex-1 bg-[#F7F3EB] px-8 py-7">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default DoctorLayout;