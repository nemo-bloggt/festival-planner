import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function AppLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="border-b border-slate-800 bg-slate-900">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <h1 className="text-xl font-bold">
            Festival Planner
          </h1>

          <div className="flex items-center gap-4">
            {user ? (
              <>
                <span className="text-sm text-slate-300">
                  {user.email}
                </span>

                <button
                  onClick={handleLogout}
                  className="rounded-lg bg-slate-800 px-3 py-2 text-sm transition hover:bg-slate-700"
                >
                  Logout
                </button>
              </>
            ) : (
              <button
                onClick={() => navigate("/login")}
                className="rounded-lg bg-indigo-600 px-3 py-2 text-sm hover:bg-indigo-500"
              >
                Login
              </button>
            )}
          </div>
        </div>
      </header>

      <main>
        <Outlet />
      </main>
    </div>
  );
}