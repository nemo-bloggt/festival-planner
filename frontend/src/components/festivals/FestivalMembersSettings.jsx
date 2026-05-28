import PersonSelect from "../people/PersonSelect";

export default function FestivalMembersSettings({
  festivalMembers,
  newFestivalMemberPersonId,
  setNewFestivalMemberPersonId,
  newFestivalMemberRole,
  setNewFestivalMemberRole,
  onAddFestivalMember,
  onRemoveFestivalMember,
  onUpdateFestivalMemberRole,
}) {
  return (
    <section className="mt-8 rounded-2xl bg-slate-900 p-6">
      <h2 className="text-xl font-semibold">
        Festival-Mitglieder
      </h2>

      <div className="mt-4 grid gap-3 rounded-xl bg-slate-800 p-4 md:grid-cols-[1fr_auto_auto] md:items-start">
        <PersonSelect
          value={newFestivalMemberPersonId}
          onChange={setNewFestivalMemberPersonId}
          placeholder="Person als Festival-Mitglied suchen..."
        />

        <select
          value={newFestivalMemberRole}
          onChange={(event) =>
            setNewFestivalMemberRole(event.target.value)
          }
          className="rounded-xl bg-slate-900 px-3 py-2 text-sm text-slate-100 ring-1 ring-slate-700"
        >
          <option value="member">member</option>
          <option value="festival_admin">festival_admin</option>
        </select>

        <button
          type="button"
          onClick={onAddFestivalMember}
          className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-500"
        >
          Hinzufügen
        </button>
      </div>

      <div className="mt-4 space-y-2">
        {festivalMembers.length === 0 ? (
          <p className="text-sm text-slate-400">
            Noch keine Festival-Mitglieder angelegt.
          </p>
        ) : (
          festivalMembers.map((member) => (
            <div
              key={member.id}
              className="flex items-center justify-between rounded-xl bg-slate-800 px-4 py-3"
            >
              <div className="flex items-center gap-3">
                <span>
                  {member.expand?.person?.name || "Unbekannte Person"}
                </span>

                <select
                  value={member.role}
                  onChange={(event) =>
                    onUpdateFestivalMemberRole(
                      member.id,
                      event.target.value
                    )
                  }
                  className="rounded-lg bg-slate-900 px-3 py-1 text-xs text-slate-100 ring-1 ring-slate-700"
                >
                  <option value="member">member</option>
                  <option value="festival_admin">festival_admin</option>
                </select>
              </div>

              <button
                type="button"
                onClick={() =>
                  onRemoveFestivalMember(member.id)
                }
                className="rounded-lg bg-red-600 px-3 py-1 text-xs font-medium text-white hover:bg-red-500"
              >
                Entfernen
              </button>
            </div>
          ))
        )}
      </div>
    </section>
  );
}