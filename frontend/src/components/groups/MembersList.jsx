import { getPersonName } from "../../utils/formatters";

function MembersList({ members, onRemoveMember }) {
  return (
    <section>
      <h5 className="mb-3 text-sm font-semibold uppercase tracking-wider text-slate-400">
        Mitglieder
      </h5>

      {members.length === 0 ? (
        <p className="text-slate-500">Noch keine Personen.</p>
      ) : (
        <ul className="space-y-2">
          {members.map((member) => (
            <li
  key={member.id}
  className="flex items-center justify-between rounded-xl bg-slate-900 px-4 py-3"
>
  <span>{getPersonName(member.expand?.person)}</span>

  <div className="flex items-center gap-2">
    <span className="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-300">
      {member.role}
    </span>

    <button
      type="button"
      onClick={() => onRemoveMember(member.id)}
      className="rounded-lg bg-red-600 px-3 py-1 text-xs hover:bg-red-500"
    >
      Entfernen
    </button>
  </div>
</li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default MembersList;