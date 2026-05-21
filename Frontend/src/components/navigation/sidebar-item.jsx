import { NavLink } from "react-router-dom"

function SidebarItem({ title, path, icon: Icon }) {
    return (
  <NavLink
  to={path}
  className={({ isActive }) =>
    `
    flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all duration-200

    ${
      isActive
        ? "bg-[#6B8F71] text-white"
        : "hover:bg-[#EDE8DC]"
    }
    `
  }
>

    <Icon size={20} />

    <p className="text-[#1E1E1E] font-medium">
      {title}
    </p>

  </NavLink>
)
}

export default SidebarItem