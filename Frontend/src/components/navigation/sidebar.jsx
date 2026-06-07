import { sidebarMenus } from "../../data/sidebar-menu"
import SidebarItem from "./sidebar-item"
import {
  LogOut,
  LifeBuoy
} from "lucide-react"
import { useNavigate } from "react-router-dom"

function Sidebar() {
 const user = JSON.parse(
  localStorage.getItem("user")
)

const role = user?.role

const menus = sidebarMenus[role] || []

const navigate = useNavigate()

const handleLogout = () => {

  localStorage.clear()

  navigate("/login")
}
  return (
    <aside className="
  w-64
  min-h-screen
  bg-white
  border-r
  border-[#EDE8DC]
  flex
  flex-col
">

<div className="p-6">

  <h1 className="text-2xl font-bold text-[#6B8F71]">
    PRIMA Admin
  </h1>

  <p className="text-xs text-gray-500">
    MedicalPracticePortal
  </p>

</div>

<div className="flex flex-col justify-between flex-1">

  <div className="px-4 space-y-2">
    {menus.map((menu) => (
      <SidebarItem
        key={menu.path}
        title={menu.title}
        icon={menu.icon}
        path={menu.path}
      />
    ))}
  </div>

    <div className="px-4 pb-6 space-y-3">

      {/* NEW APPOINTMENT */}
      <button
        className="
          w-full
          bg-[#4D7C57]
          text-white
          py-3
          rounded-xl
          font-medium
          hover:opacity-90
        "
      >
        New Appointment
      </button>

      {/* SUPPORT */}
      <button
        className="
          flex items-center gap-3
          w-full
          px-4 py-3
          rounded-xl
          hover:bg-[#EDE8DC]
          text-[#1E1E1E]
        "
      >
        <LifeBuoy size={20} />
        <span>Support</span>
      </button>

      {/* LOGOUT */}
      <button
        onClick={handleLogout}
        className="
          flex items-center gap-3
          w-full
          px-4 py-3
          rounded-xl
          hover:bg-red-50
          text-red-500
          transition
        "
      >
        <LogOut size={20} />
        <span>Logout</span>
      </button>

    </div>

</div>

    </aside>
  )
}

export default Sidebar