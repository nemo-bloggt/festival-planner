import { useState } from "react";
import PersonSelect from "../people/PersonSelect";

export default function MemberForm({ onAddMember }) {
  const [personId, setPersonId] = useState("");
  const [role, setRole] = useState("member");
  const [saving, setSaving] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();

    if (!personId) return;

    try {
      setSaving(true);

      await onAddMember({
        person: personId,
        role,
      });

      setPersonId("");
      setRole("member");
    } finally {
      setSaving(false);
    }
  }

  return (
   <form
  onSubmit={handleSubmit}
  className="mt-4 flex flex-wrap items-center gap-3"
>
      <PersonSelect value={personId} onChange={setPersonId} />

      <select
  value={role}
  onChange={(event) => setRole(event.target.value)}
  className="h-11 rounded-lg bg-slate-800 px-3 text-slate-100"
>
        <option value="member">Member</option>
        <option value="admin">Admin</option>
      </select>

      <button
  type="submit"
  disabled={saving || !personId}
  className="h-11 rounded-lg bg-emerald-600 px-4 font-medium hover:bg-emerald-500 disabled:opacity-50"
>
        {saving ? "Speichert..." : "Hinzufügen"}
      </button>
    </form>
  );
}