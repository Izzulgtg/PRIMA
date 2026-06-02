import {
  LayoutDashboard,
  Settings,
  ShieldAlert,
  Database,
  CalendarDays,
  Users,
  MessageCircle,
  ClipboardList,
  History,
  User,
} from "lucide-react"

export const sidebarMenus = {

  /* ADMIN */
  admin: [
    {
      title: "Dashboard",
      path: "/admin/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Maintenance",
      path: "/admin/maintenance",
      icon: Settings,
    },
    {
      title: "System Support",
      path: "/admin/support",
      icon: ShieldAlert,
    },
    {
      title: "Data Manager",
      path: "/admin/data-manager",
      icon: Database,
    },
  ],

  /* DOKTER */
  dokter: [
    {
      title: "Dashboard",
      path: "/doctor/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Jadwal",
      path: "/doctor/schedule",
      icon: CalendarDays,
    },
    {
      title: "Pasien",
      path: "/doctor/patients",
      icon: Users,
    },
    {
      title: "Konsultasi",
      path: "/doctor/consultation",
      icon: MessageCircle,
    },
  ],

  /* PASIEN */
  pasien: [
    {
      title: "Dashboard",
      path: "/patient/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Booking",
      path: "/patient/booking",
      icon: ClipboardList,
    },
    {
      title: "Riwayat",
      path: "/patient/history",
      icon: History,
    },
    {
      title: "Profile",
      path: "/patient/profile",
      icon: User,
    },
  ],

}