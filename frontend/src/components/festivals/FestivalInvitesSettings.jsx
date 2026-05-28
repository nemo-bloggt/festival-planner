import { useState } from "react";
import { createInvite } from "../../services/inviteService";
import Card from "../ui/Card";
import Button from "../ui/Button";

export default function FestivalInvitesSettings({ festival }) {
  const [role, setRole] = useState("member");
  const [invite, setInvite] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleCreateInvite() {
    setLoading(true);
    setError("");
    setInvite(null);

    try {
      const createdInvite = await createInvite(festival.id, role);
      setInvite(createdInvite);
    } catch (error) {
      console.error(error);
      setError("Einladung konnte nicht erstellt werden.");
    } finally {
      setLoading(false);
    }
  }

  const inviteLink = invite
    ? `${window.location.origin}/invite/${invite.token}`
    : "";

  return (
    <Card>
      <h2 className="text-xl font-semibold">Einladungen</h2>

      <p className="mt-2 text-sm text-slate-400">
        Erstelle einen Einladungslink für dieses Festival.
      </p>

      <div className="mt-6 space-y-4">
        <label className="block">
          <span className="text-sm text-slate-300">Rolle</span>

          <select
            value={role}
            onChange={(event) => setRole(event.target.value)}
            className="mt-2 w-full rounded-xl bg-slate-900 px-4 py-2 text-slate-100"
          >
            <option value="member">Mitglied</option>
            <option value="festival_admin">Festival-Admin</option>
          </select>
        </label>

        <Button onClick={handleCreateInvite} disabled={loading}>
          {loading ? "Erstelle Einladung..." : "Einladung erstellen"}
        </Button>

        {error && <p className="text-sm text-red-400">{error}</p>}

        {inviteLink && (
          <div className="rounded-xl bg-slate-900 p-4">
            <p className="text-sm text-slate-400">Einladungslink:</p>

            <input
              value={inviteLink}
              readOnly
              className="mt-2 w-full rounded-lg bg-slate-950 px-3 py-2 text-sm text-slate-100"
            />
          </div>
        )}
      </div>
    </Card>
  );
}