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

import DoctorDashboardPage from "../pages/doctor/doctor-dashboard-page";
import DoctorLayout from "../layouts/doctor-layout";
import ExaminationPage from "../pages/doctor/examination-page";
import ConsultationPage from "../pages/doctor/consultation-page";
import SchedulePage from "../pages/doctor/schedule-page";
import MedicinePage from "../pages/doctor/medicine-page";
import MedicalRecordsPage from "../pages/doctor/medical-records-page";
import MonitoringPage from "../pages/doctor/monitoring-page";

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

        {/* DOCTOR */}
        <Route
          path="/doctor"
          element={<DoctorLayout />}
        >
          <Route
            path="dashboard"
            element={<DoctorDashboardPage />}
          />

          <Route
            path="examination"
            element={<ExaminationPage />}
          />

          <Route
            path="examination/:patientId"
            element={<ExaminationPage />}
          />

          <Route
            path="consultation"
            element={<ConsultationPage />}
          />

          <Route 
            path="schedule" 
            element={<SchedulePage />} 
          />

          <Route 
            path="medicine" 
            element={<MedicinePage />} 
          />


          <Route 
            path="medical-records" 
            element={<MedicalRecordsPage />} 
          />

          <Route 
            path="monitoring" 
            element={<MonitoringPage />} 
          />

        </Route>

      </Routes>

    </BrowserRouter>
  )
}

export default AppRouter