import { useState } from "react";

export default function GroupCard({
  group,
  children,
  onUpdateGroup,
  onDeleteGroup,
}) {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(group.name);
  const [saving, setSaving] = useState(false);

  async function handleSave() {
    if (!name.trim()) return;

    try {
      setSaving(true);

      await onUpdateGroup(group.id, {
        name: name.trim(),
      });

      setEditing(false);
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    const confirmed = window.confirm(
      `Gruppe "${group.name}" wirklich löschen?`
    );

    if (!confirmed) return;

    await onDeleteGroup(group.id);
  }

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          {editing ? (
            <input
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="w-full rounded-lg bg-slate-800 p-3 text-xl font-bold text-emerald-300"
            />
          ) : (
            <h4 className="text-xl font-bold text-emerald-300">
              {group.name}
            </h4>
          )}
        </div>

        <div className="flex gap-2">
          {editing ? (
            <>
              <button
                onClick={handleSave}
                disabled={saving}
                className="rounded-lg bg-emerald-600 px-3 py-2 text-sm font-medium hover:bg-emerald-500"
              >
                Speichern
              </button>

              <button
                onClick={() => {
                  setEditing(false);
                  setName(group.name);
                }}
                className="rounded-lg bg-slate-700 px-3 py-2 text-sm hover:bg-slate-600"
              >
                Abbrechen
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setEditing(true)}
                className="rounded-lg bg-slate-800 px-3 py-2 text-sm hover:bg-slate-700"
              >
                Bearbeiten
              </button>

              <button
                onClick={handleDelete}
                className="rounded-lg bg-red-600 px-3 py-2 text-sm hover:bg-red-500"
              >
                Löschen
              </button>
            </>
          )}
        </div>
      </div>

      {children}
    </div>
  );
}