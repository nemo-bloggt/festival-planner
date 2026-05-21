import { NavLink } from "react-router-dom";

function navClass({ isActive }) {
  return `
    block rounded-lg px-3 py-2 transition
    ${
      isActive
        ? "bg-slate-800 text-white"
        : "text-slate-300 hover:bg-slate-800 hover:text-white"
    }
  `;
}

export default function Sidebar() {
  return (
    <aside className="min-h-screen w-64 border-r border-slate-800 bg-slate-950 p-4 text-slate-100">
      <div className="mb-8">
        <p className="text-sm text-slate-400">Festival Planner</p>
        <h1 className="text-xl font-bold">Admin</h1>
      </div>

      <nav className="space-y-2">
        <NavLink to="/" className={navClass}>
          Dashboard
        </NavLink>

        <NavLink to="/festivals/new" className={navClass}>
          Festival erstellen
        </NavLink>

        <NavLink to="/people" className={navClass}>
          Personen
        </NavLink>
      </nav>
    </aside>
  );
}