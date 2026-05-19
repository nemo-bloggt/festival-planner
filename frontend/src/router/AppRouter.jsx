import { BrowserRouter, Routes, Route } from "react-router-dom";

import AppLayout from "../layouts/AppLayout";

import DashboardPage from "../pages/DashboardPage";
import FestivalDetailPage from "../pages/FestivalDetailPage";
import AdminPage from "../pages/AdminPage";
import LoginPage from "../pages/LoginPage";
import ProtectedRoute from "../routes/ProtectedRoute";
import { AuthProvider } from "../context/AuthContext";

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

        <Route
          path="/festivals/:festivalId"
          element={<FestivalDetailPage />}
        />

        <Route path="/admin" element={<AdminPage />} />
      </Route>
    </Routes>
  </AuthProvider>
</BrowserRouter>
  );
}