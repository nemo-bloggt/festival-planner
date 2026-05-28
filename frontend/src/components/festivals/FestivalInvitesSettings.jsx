import { useEffect, useState } from "react";
import {
  createInvite,
  deactivateInvite,
  loadFestivalInvites,
} from "../../services/inviteService";
import Card from "../ui/Card";
import Button from "../ui/Button";

export default function FestivalInvitesSettings({ festival }) {
  const [role, setRole] = useState("member");
  const [invites, setInvites] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copiedInviteId, setCopiedInviteId] = useState(null);

  async function loadInvites() {
    const loadedInvites = await loadFestivalInvites(festival.id);
    setInvites(loadedInvites);
  }

  useEffect(() => {
    loadInvites();
  }, [festival.id]);

  async function handleCreateInvite() {
    setLoading(true);
    setError("");

    try {
      await createInvite(festival.id, role);
      await loadInvites();
    } catch (error) {
      console.error(error);
      setError("Einladung konnte nicht erstellt werden.");
    } finally {
      setLoading(false);
    }
  }

  async function handleDeactivateInvite(inviteId) {
    await deactivateInvite(inviteId);
    await loadInvites();
  }

  function getInviteLink(token) {
    return `${window.location.origin}/invite/${token}`;
  }

  async function copyInviteLink(invite) {
  await navigator.clipboard.writeText(getInviteLink(invite.token));

  setCopiedInviteId(invite.id);

  setTimeout(() => {
    setCopiedInviteId(null);
  }, 2000);
}

  return (
    <Card>
      <h2 className="text-xl font-semibold">Einladungen</h2>

      <p className="mt-2 text-sm text-slate-400">
        Erstelle und verwalte Einladungslinks für dieses Festival.
      </p>

      <div className="mt-6 flex gap-3">
        <select
          value={role}
          onChange={(event) => setRole(event.target.value)}
          className="rounded-xl bg-slate-900 px-4 py-2 text-slate-100"
        >
          <option value="member">Mitglied</option>
          <option value="festival_admin">Festival-Admin</option>
        </select>

        <Button onClick={handleCreateInvite} disabled={loading}>
  {loading ? "Erstelle..." : "Einladung erstellen"}
</Button>
      </div>

      {error && <p className="mt-4 text-sm text-red-400">{error}</p>}

      <div className="mt-8 space-y-3">
        {invites.map((invite) => (
          <div
            key={invite.id}
            className="rounded-xl bg-slate-900 p-4 text-sm"
          >
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="font-medium text-slate-100">
                  Rolle: {invite.role}
                </p>
                <p className="text-slate-400">
                  Gültig bis:{" "}
                  {invite.expires_at
                    ? new Date(invite.expires_at).toLocaleString("de-DE")
                    : "ohne Ablaufdatum"}
                </p>
                <p className={invite.active ? "text-green-400" : "text-red-400"}>
                  {invite.active ? "Aktiv" : "Deaktiviert"}
                </p>
              </div>

              <div className="flex gap-2">
                <Button onClick={() => copyInviteLink(invite)}>
  {copiedInviteId === invite.id ? "Kopiert!" : "Link kopieren"}
</Button>

                {invite.active && (
                  <Button onClick={() => handleDeactivateInvite(invite.id)}>
                    Deaktivieren
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))}

        {invites.length === 0 && (
          <p className="text-sm text-slate-400">
            Noch keine Einladungen erstellt.
          </p>
        )}
      </div>
    </Card>
  );
}