import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom"

import AdminLayout from "../layouts/admin-layout"

import DashboardPage from "../pages/admin/dashboard-page"
import MaintenancePage from "../pages/admin/maintenance-page"
import SupportPage from "../pages/admin/support-page"
import DataManagerPage from "../pages/admin/data-manager-page"

function AppRouter() {
  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Navigate to="/admin/dashboard" />} />

        <Route path="/admin" element={<AdminLayout />}>

          <Route
            path="dashboard"
            element={<DashboardPage />}
          />

          <Route
            path="maintenance"
            element={<MaintenancePage />}
          />

          <Route
            path="support"
            element={<SupportPage />}
          />

          <Route
            path="data-manager"
            element={<DataManagerPage />}
          />

        </Route>

      </Routes>

    </BrowserRouter>
  )
}

export default AppRouter