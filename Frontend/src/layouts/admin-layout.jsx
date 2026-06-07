import { Outlet } from "react-router-dom"
import Navbar from "../components/navigation/navbar"

import Sidebar from "../components/navigation/sidebar"

function AdminLayout() {
  return (
    <div className="flex bg-[#F5F0E8] min-h-screen">

      <Sidebar />
    <div className="flex-1 flex flex-col">

    <Navbar />

    <main className="p-8">
        <Outlet />
    </main>

    </div>

    </div>
  )
}

export default AdminLayout