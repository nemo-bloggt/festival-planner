import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { loadFestivalBySlug } from "../services/festivalService";
import FestivalGroupsSection from "../components/festivals/FestivalGroupsSection";
import FestivalDetailHeader from "../components/festivals/FestivalDetailHeader";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import GroupForm from "../components/groups/GroupForm";
import {
  createGroup,
  updateGroup,
  deleteGroup,
} from "../services/groupService";
import {
  createGroupMember,
  deleteGroupMember,
} from "../services/memberService";

import { loadPeople } from "../services/personService";
import {
  loadFestivalMembers,
} from "../services/festivalMemberService";
import {
  getCurrentPersonId,
  isFestivalAdmin,
} from "../utils/authHelpers";





export default function FestivalDetailPage() {
  const { festivalSlug } = useParams();

  const [festivalData, setFestivalData] = useState(null);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);
const [people, setPeople] = useState([]);
const [festivalMembers, setFestivalMembers] = useState([]);
const [newFestivalMemberPersonId, setNewFestivalMemberPersonId] = useState("");
const [newFestivalMemberRole, setNewFestivalMemberRole] = useState("member");


const currentPersonId = getCurrentPersonId();

const currentUserIsFestivalAdmin = isFestivalAdmin(
  festivalMembers,
  currentPersonId
);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await loadFestivalBySlug(festivalSlug);
        setFestivalData(data);
        const peopleRecords = await loadPeople();
setPeople(peopleRecords);
        const members = await loadFestivalMembers(data.festival.id);
        setFestivalMembers(members);
      } catch (error) {
  console.error("Fehler beim Laden der Festivaldetails:", error);
  setError("Festival konnte nicht geladen werden.");
} finally {
  setLoading(false);
}
    };

    loadData();
  }, [festivalSlug]);

  if (loading) {
  return (
    <main className="min-h-screen bg-slate-950 p-10 text-slate-100">
      <LoadingSpinner text="Lade Festival..." />
    </main>
  );
}

  if (error) {
  return (
    <main className="min-h-screen bg-slate-950 p-10 text-slate-100">
      <Link to="/" className="text-blue-400 hover:underline">
        ← Zurück
      </Link>

      <div className="mt-6 rounded-2xl border border-red-900 bg-red-950/40 p-6">
        <h1 className="text-2xl font-bold text-red-300">
          Festival konnte nicht geladen werden
        </h1>

        <p className="mt-2 text-red-200">
          Prüfe bitte, ob der Festival-Slug korrekt ist.
        </p>
      </div>
    </main>
  );
}

  if (!festivalData?.festival) {
    return (
      <main className="min-h-screen bg-slate-950 p-10 text-slate-100">
        <Link to="/" className="text-blue-400 hover:underline">
          ← Zurück
        </Link>

        <h1 className="mt-6 text-2xl font-bold">
          Festival nicht gefunden
        </h1>
      </main>
    );
  }

  async function handleCreateGroup(groupData) {
  if (!festivalData?.festival?.id) return;

  try {
    await createGroup({
      ...groupData,
      festival: festivalData.festival.id,
    });

    await refreshFestivalData();
  } catch (error) {
    console.error("Fehler beim Anlegen der Gruppe:", error);
    alert("Gruppe konnte nicht angelegt werden.");
  }
}

async function refreshFestivalMembers() {
  if (!festivalData?.festival?.id) return;

  const members = await loadFestivalMembers(festivalData.festival.id);

   

  setFestivalMembers(members);
}

async function handleAddFestivalMember() {
  if (!festivalData?.festival?.id) {
    alert("Festival wurde noch nicht geladen.");
    return;
  }

  if (!newFestivalMemberPersonId) {
    alert("Bitte zuerst eine Person auswählen.");
    return;
  }

  try {
    await addFestivalMember({
      festival: festivalData.festival.id,
      person: newFestivalMemberPersonId,
      role: newFestivalMemberRole,
    });

    setNewFestivalMemberPersonId("");
    setNewFestivalMemberRole("member");

    await refreshFestivalMembers();
  } catch (error) {
    console.error("Fehler beim Hinzufügen des Festival-Mitglieds:", error);
    alert(error.message || "Festival-Mitglied konnte nicht hinzugefügt werden.");
  }
}

async function handleRemoveMember(memberId) {
  try {
    await deleteGroupMember(memberId);
    await refreshFestivalData();
  } catch (error) {
    console.error("Fehler beim Entfernen des Mitglieds:", error);
    alert("Mitglied konnte nicht entfernt werden.");
  }
}

async function handleRemoveFestivalMember(memberId) {
  try {
    await removeFestivalMember(memberId);

    await refreshFestivalMembers();
  } catch (error) {
    console.error("Fehler beim Entfernen des Festival-Mitglieds:", error);
    alert(error.message || "Festival-Mitglied konnte nicht entfernt werden.");
  }
}

async function refreshFestivalData() {
  const updatedData = await loadFestivalBySlug(festivalSlug);
  setFestivalData(updatedData);
}

async function handleUpdateGroup(groupId, groupData) {
  try {
    await updateGroup(groupId, groupData);
    await refreshFestivalData();
  } catch (error) {
    console.error("Fehler beim Aktualisieren der Gruppe:", error);
    alert("Gruppe konnte nicht aktualisiert werden.");
  }
}

async function handleDeleteGroup(groupId) {
  try {
    await deleteGroup(groupId);
    await refreshFestivalData();
  } catch (error) {
    console.error("Fehler beim Löschen der Gruppe:", error);
    alert("Gruppe konnte nicht gelöscht werden.");
  }
}

async function handleAddMember(groupId, memberData) {
  try {
    await createGroupMember({
      ...memberData,
      group: groupId,
    });

    await refreshFestivalData();
  } catch (error) {
    console.error("Fehler beim Hinzufügen des Mitglieds:", error);
    alert("Mitglied konnte nicht hinzugefügt werden.");
  }
}

async function handleRemoveFestivalMember(memberId) {
  try {
    await removeFestivalMember(memberId);

    await refreshFestivalMembers();
  } catch (error) {
    console.error("Fehler beim Entfernen des Festival-Mitglieds:", error);
    alert("Festival-Mitglied konnte nicht entfernt werden.");
  }
}

async function handleUpdateFestivalMemberRole(memberId, role) {
  try {
    await updateFestivalMemberRole(memberId, role);
    await refreshFestivalMembers();
  } catch (error) {
    console.error("Fehler beim Ändern der Rolle:", error);
    alert(error.message || "Rolle konnte nicht geändert werden.");
    await refreshFestivalMembers();
  }
}
  const { festival, groups, members, packingItems, carpools } = festivalData;

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto max-w-5xl px-4 py-10">
        <Link to="/" className="text-sm text-blue-400 hover:underline">
          ← Zurück zur Übersicht
        </Link>

        
        

<FestivalDetailHeader
  festival={festival}
  canManageFestival={currentUserIsFestivalAdmin}
/>


<p className="mt-2 text-xs text-slate-500">
  Aktuelle Person-ID: {currentPersonId || "nicht verknüpft"}
</p>
<p className="text-xs text-slate-500">
  Festival Admin: {currentUserIsFestivalAdmin ? "JA" : "NEIN"}
</p>

{currentUserIsFestivalAdmin && (
  <GroupForm onCreateGroup={handleCreateGroup} />
)}

<FestivalGroupsSection
  groups={groups}
  members={members}
  packingItems={packingItems}
  carpools={carpools}
  people={people}
  onUpdateGroup={handleUpdateGroup}
  onDeleteGroup={handleDeleteGroup}
  onAddMember={handleAddMember}
  onRemoveMember={handleRemoveMember}
/>
      </div>
    </main>
  );
}