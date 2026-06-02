import { sidebarMenus } from "../../data/sidebar-menu"
import SidebarItem from "./sidebar-item"

function Sidebar() {
  const role = "admin"
  const menus = sidebarMenus[role]
  return (
    <aside className="w-64 min-h-screen bg-white border-r border-[#EDE8DC]">

      <div className="p-6">
        <h1 className="text-2xl font-bold text-[#6B8F71]">
          PRIMA
        </h1>
      </div>

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

    </aside>
  )
}

export default Sidebar