import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  async function handleSubmit(event) {
    event.preventDefault();
    setError(null);

    try {
      await login(email, password);
      navigate("/");
    } catch (error) {
      console.error("Login fehlgeschlagen:", error);
      setError("Login fehlgeschlagen. Bitte E-Mail und Passwort prüfen.");
    }
  }

  return (
    <main className="min-h-screen bg-slate-950 p-10 text-slate-100">
      <div className="mx-auto max-w-md rounded-2xl border border-slate-800 bg-slate-900 p-6">
        <h1 className="text-2xl font-bold">Login</h1>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="block text-sm text-slate-300">E-Mail</label>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-slate-100"
            />
          </div>

          <div>
            <label className="block text-sm text-slate-300">Passwort</label>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-slate-100"
            />
          </div>

          {error && <p className="text-sm text-red-400">{error}</p>}

          <button
            type="submit"
            className="w-full rounded-lg bg-blue-600 px-4 py-2 font-semibold hover:bg-blue-500"
          >
            Einloggen
          </button>
        </form>
      </div>
    </main>
  );
}