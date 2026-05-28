import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCurrentPersonId } from "../utils/authHelpers";
import {
  getInviteByToken,
  joinFestivalWithInvite,
  getFestivalFromInvite,
} from "../services/inviteService";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";

export default function InviteJoinPage() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [invite, setInvite] = useState(null);
  const [loading, setLoading] = useState(true);
  const [joining, setJoining] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadInvite() {
      try {
        const loadedInvite = await getInviteByToken(token);
        if (!loadedInvite.active) {
  setError("Diese Einladung ist nicht mehr aktiv.");
  return;
}

if (
  loadedInvite.expires_at &&
  new Date(loadedInvite.expires_at) < new Date()
) {
  setError("Diese Einladung ist abgelaufen.");
  return;
}
        setInvite(loadedInvite);
      } catch (error) {
        console.error(error);
        setError("Diese Einladung wurde nicht gefunden oder ist nicht mehr gültig.");
      } finally {
        setLoading(false);
      }
    }

    loadInvite();
  }, [token]);

  async function handleJoin() {
    setJoining(true);
    setError("");

    try {
      const personId = getCurrentPersonId();

      if (!personId) {
        throw new Error("Keine Person für den eingeloggten User gefunden.");
      }

      await joinFestivalWithInvite(invite, personId);

      const festival = await getFestivalFromInvite(invite);

navigate(`/festivals/${festival.slug}`);
    } catch (error) {
  console.error(error);

  if (error.message === "ALREADY_MEMBER") {
    setError("Du bist bereits Mitglied dieses Festivals.");
    return;
  }

  setError("Beitritt konnte nicht abgeschlossen werden.");
} finally {
      setJoining(false);
    }
  }

  if (loading) {
    return <p className="p-8 text-slate-300">Einladung wird geladen...</p>;
  }

  if (error && !invite) {
    return <p className="p-8 text-red-400">{error}</p>;
  }

  return (
    <main className="min-h-screen bg-slate-950 p-8 text-slate-100">
      <Card>
        <h1 className="text-2xl font-bold">Festival beitreten</h1>

        <p className="mt-3 text-slate-400">
          Du wurdest eingeladen, diesem Festival beizutreten.
        </p>

        <div className="mt-6 rounded-xl bg-slate-900 p-4">
          <p className="text-sm text-slate-400">Rolle</p>
          <p className="mt-1 font-medium">{invite.role}</p>
        </div>

        {error && <p className="mt-4 text-sm text-red-400">{error}</p>}

        <Button className="mt-6" onClick={handleJoin} disabled={joining}>
          {joining ? "Trete bei..." : "Festival beitreten"}
        </Button>
      </Card>
    </main>
  );
}