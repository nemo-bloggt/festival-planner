import { useState } from "react";

export default function GroupForm({ onCreateGroup }) {
  const [name, setName] = useState("");
  const [saving, setSaving] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();

    if (!name.trim()) return;

    try {
      setSaving(true);

      await onCreateGroup({
        name: name.trim(),
      });

      setName("");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-slate-800 bg-slate-900 p-5"
    >
      <label className="mb-2 block text-sm font-medium text-slate-300">
        Neue Gruppe
      </label>

      <div className="flex gap-3">
        <input
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="z. B. Technik, Aufbau, Bandbetreuung"
          className="flex-1 rounded-lg bg-slate-800 p-3 text-slate-100"
        />

        <button
          type="submit"
          disabled={saving || !name.trim()}
          className="rounded-lg bg-emerald-600 px-4 py-2 font-medium hover:bg-emerald-500 disabled:opacity-50"
        >
          {saving ? "Speichert..." : "Gruppe anlegen"}
        </button>
      </div>
    </form>
  );
}