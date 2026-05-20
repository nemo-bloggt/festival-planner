import { useState } from "react";

export default function MemberForm({ people, onAddMember }) {
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
    <form onSubmit={handleSubmit} className="mt-4 flex gap-3">
      <select
        value={personId}
        onChange={(event) => setPersonId(event.target.value)}
        className="flex-1 rounded-lg bg-slate-800 p-3 text-slate-100"
      >
        <option value="">Person auswählen</option>

        {people.map((person) => (
          <option key={person.id} value={person.id}>
            {person.name}
          </option>
        ))}
      </select>

      <select
        value={role}
        onChange={(event) => setRole(event.target.value)}
        className="rounded-lg bg-slate-800 p-3 text-slate-100"
      >
        <option value="member">Member</option>
        <option value="admin">Admin</option>
      </select>

      <button
        type="submit"
        disabled={saving || !personId}
        className="rounded-lg bg-emerald-600 px-4 py-2 font-medium hover:bg-emerald-500 disabled:opacity-50"
      >
        {saving ? "Speichert..." : "Hinzufügen"}
      </button>
    </form>
  );
}