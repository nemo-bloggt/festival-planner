import { BrowserRouter, Routes, Route } from "react-router-dom";

import DashboardPage from "../pages/DashboardPage";
import FestivalDetailPage from "../pages/FestivalDetailPage";
import AdminPage from "../pages/AdminPage";
import LoginPage from "../pages/LoginPage";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashboardPage />} />

        <Route
          path="/festivals/:festivalId"
          element={<FestivalDetailPage />}
        />

        <Route path="/admin" element={<AdminPage />} />

        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}