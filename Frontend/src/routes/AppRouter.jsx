import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom"

import AdminLayout from "../layouts/admin-layout"
import PatientLayout from "../layouts/patient-layout"
import DoctorLayout from "../layouts/doctor-layout";

import AdminProfilePage from "../pages/admin/admin-profile-page";

import PatientDashboardPage from "../pages/patient/dashboard/dashboard-page"
import PatientAppointmentPage from "../pages/patient/appointment/appointment-page"
import PatientConsultationPage from "../pages/patient/consultation/consultation-page"
import PatientHealthRecordsPage from "../pages/patient/health-records/health-records-page"
import PatientProfilePage from "../pages/patient/profile/profile-page"
import EditProfilePage from "../pages/patient/profile/edit-profile-page"
import PatientSecurityPage from "../pages/patient/security/security-page"
import PatientChangePW from "../pages/patient/security/change-password-page"
import ConsultationRoomPage from "../pages/patient/consultation-room/consultation-room-page"
import WaitingRoomPage from "../pages/patient/consultation-room/waiting-room-page"

import DashboardPage from "../pages/admin/dashboard-page"
import MaintenancePage from "../pages/admin/maintenance-page"
import SupportPage from "../pages/admin/support-page"
import DataManagerPage from "../pages/admin/data-manager-page"

import PrivacyPolicyPage from "../pages/legal/privacy-policy-page";
import TermsPage from "../pages/legal/terms-page";
import DisclaimerPage from "../pages/legal/disclaimer-page";
import ContactPage from "../pages/legal/contact-page";

import RegisterPage from "../pages/auth/register-page"
import LoginPage from "../pages/auth/login-page"

import LandingPage from "../pages/landing-page"

import DoctorDashboard from "../pages/doctor/DoctorDashboard";
import QueuePage from "../pages/doctor/QueuePage";
import SchedulePage from "../pages/doctor/SchedulePage";
import ConsultationPage from "../pages/doctor/ConsultationPage";
import MonitoringPage from "../pages/doctor/MonitoringPage";
import StatisticsPage from "../pages/doctor/StatisticsPage";
import ManajemenObat from "../pages/doctor/ManajemenObat";
import ConsultationChatPage from "../pages/doctor/ConsultationChatPage";
import AddSlotPage from "../pages/doctor/AddSlotPage";

import DaftarPasien from "../pages/doctor/DaftarPasien";
// 📑 PERBAIKAN 1: Mengubah path import dari components ke pages sesuai struktur foldermu
import ProfileDokter from "../pages/doctor/ProfileDokter";


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

          <Route
            path="profile"
            element={<AdminProfilePage />}
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
              path = "consultation-room/:sessionId"
              element = {<ConsultationRoomPage/>}
          />

          <Route
            path="waiting-room"
            element={<WaitingRoomPage />}
          />

          <Route
            path="health-records"
            element={<PatientHealthRecordsPage />}
          />

          <Route
            path="profile"
            element={<PatientProfilePage />}
          />

          <Route
            path="profile/edit"
            element={<EditProfilePage />}
          />

          <Route
            path="security"
            element={<PatientSecurityPage />}
          />

          <Route
            path="change-password"
            element={<PatientChangePW />}
          />

        </Route>

        {/* DOCTOR */}
        <Route path="/doctor" element={<DoctorLayout />}>
          <Route path="dashboard" element={<DoctorDashboard />} />
          <Route path="queue" element={<QueuePage />} />
          <Route path="schedule" element={<SchedulePage />} />
          <Route path="consultation" element={<ConsultationPage />} />
          <Route path="monitoring" element={<MonitoringPage />} />
          <Route path="medicine" element={<ManajemenObat />} />
          <Route path="profile" element={<ProfileDokter />} />
          <Route path="medical-records" element={<DaftarPasien />} />
          <Route path="patient-list" element={<DaftarPasien />} />
          <Route path="schedule/add" element={<AddSlotPage />} />
          <Route path="statistics" element={<StatisticsPage />} />
          <Route path="consultation-chat/:consultationId" element={<ConsultationChatPage />} />
        </Route>

        {/* LEGAL & INFO */}
        <Route
          path="/privacy-policy"
          element={<PrivacyPolicyPage />}
        />

        <Route
          path="/terms"
          element={<TermsPage />}
        />

        <Route
          path="/disclaimer"
          element={<DisclaimerPage />}
        />

        <Route
          path="/contact"
          element={<ContactPage />}
        />

      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter