import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="min-h-screen w-64 border-r border-slate-800 bg-slate-950 p-4 text-slate-100">
      <div className="mb-8">
        <p className="text-sm text-slate-400">Festival Planner</p>
        <h1 className="text-xl font-bold">Admin</h1>
      </div>

      <nav className="space-y-2">
        <Link
          to="/"
          className="block rounded-lg px-3 py-2 text-slate-300 hover:bg-slate-800 hover:text-white"
        >
          Dashboard
        </Link>

        <Link
          to="/festivals/new"
          className="block rounded-lg px-3 py-2 text-slate-300 hover:bg-slate-800 hover:text-white"
        >
          Festival erstellen
        </Link>
      </nav>
    </aside>
  );
}