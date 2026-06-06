import { sidebarMenus } from "../../data/sidebar-menu"
import SidebarItem from "./sidebar-item"
import { LogOut } from "lucide-react"
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
    <aside className="w-64 min-h-screen bg-white border-r border-[#EDE8DC]">

      <div className="p-6">
        <h1 className="text-2xl font-bold text-[#6B8F71]">
          PRIMA
        </h1>
      </div>

<div className="flex flex-col justify-between h-[85vh]">

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

  <div className="px-4 pb-6">

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