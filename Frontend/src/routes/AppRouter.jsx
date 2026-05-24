import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom"

import AdminLayout from "../layouts/admin-layout"
import PatientLayout from "../layouts/patient-layout"

import PatientDashboardPage from "../pages/patient/dashboard/Dashboard-Page"
import PatientAppointmentPage from "../pages/patient/appointment/appointment-page"
import PatientConsultationPage from "../pages/patient/consultation/consultation-page"
import PatientMedicalHistoryPage from "../pages/patient/medical-history/medical-history-page"
import PatientMedicineHistoryPage from "../pages/patient/medicine-history/medicine-history-page"
import PatientProfilePage from "../pages/patient/profile/profile-page"
import PatientSecurityPage from "../pages/patient/security/security-page"

import DashboardPage from "../pages/admin/dashboard-page"
import MaintenancePage from "../pages/admin/maintenance-page"
import SupportPage from "../pages/admin/support-page"
import DataManagerPage from "../pages/admin/data-manager-page"

import RegisterPage from "../pages/auth/register-page"
import LoginPage from "../pages/auth/login-page"

import LandingPage from "../pages/landing-page"

function AppRouter() {
  return (
    <BrowserRouter>

      <Routes>

        {/* LANDING PAGE */}
        <Route
          path="/"
          element={<LandingPage />}
        />

        {/* AUTH */}
        <Route
          path="/login"
          element={<LoginPage />}
        />

        <Route
          path="/register"
          element={<RegisterPage />}
        />

        {/* ADMIN */}
        <Route
          path="/admin"
          element={<AdminLayout />}
        >

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

        {/* Patient */}
        <Route
        path="/patient"
        element={<PatientLayout />}>
        
          <Route
            path="dashboard"
            element={<PatientDashboardPage />}
          />

          <Route
            path="appointment"
            element={<PatientAppointmentPage />}
          />

          <Route
            path="consultation"
            element={<PatientConsultationPage />}
          />

          <Route
              path="medical-history"
              element={<PatientMedicalHistoryPage />}
          />

          <Route
              path="medicine-history"
              element={<PatientMedicineHistoryPage />}
          />

          <Route
              path="profile"
              element={<PatientProfilePage />}
          />

          <Route
              path="security"
              element={<PatientSecurityPage />}
          />
        
        </Route>

      </Routes>

    </BrowserRouter>
  )
}

export default AppRouter