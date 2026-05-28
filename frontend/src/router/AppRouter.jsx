import { BrowserRouter, Routes, Route } from "react-router-dom";

import AppLayout from "../layouts/AppLayout";
import DashboardPage from "../pages/DashboardPage";
import FestivalDetailPage from "../pages/FestivalDetailPage";
import AdminPage from "../pages/AdminPage";
import LoginPage from "../pages/LoginPage";
import ProtectedRoute from "../routes/ProtectedRoute";
import { AuthProvider } from "../context/AuthContext";
import FestivalCreatePage from "../pages/FestivalCreatePage";
import FestivalEditPage from "../pages/FestivalEditPage";
import PeoplePage from "../pages/PeoplePage";
import FestivalSettingsPage from "../pages/FestivalSettingsPage";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />

          <Route
            element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            }
          >
            <Route path="/" element={<DashboardPage />} />
            <Route path="/festivals/new" element={<FestivalCreatePage />} />
            <Route path="/festivals/:festivalSlug" element={<FestivalDetailPage />} />
            <Route path="/festivals/:festivalSlug/settings" element={<FestivalSettingsPage />} />
            <Route path="/festivals/:festivalSlug/edit" element={<FestivalEditPage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/people" element={<PeoplePage />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}