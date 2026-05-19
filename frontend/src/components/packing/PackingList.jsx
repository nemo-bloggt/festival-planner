import { getPersonName } from "../../utils/formatters";

function PackingList({ items }) {
  return (
    <section>
      <h5 className="mb-3 text-sm font-semibold uppercase tracking-wider text-slate-400">
        Mitbringliste
      </h5>

      {items.length === 0 ? (
        <p className="text-slate-500">Noch keine Einträge.</p>
      ) : (
        <ul className="space-y-2">
          {items.map((item) => (
            <li key={item.id} className="rounded-xl bg-slate-900 px-4 py-3">
              <div className="flex items-center justify-between gap-3">
                <span className="font-medium">
                  {item.item_name}
                  {item.quantity ? ` (${item.quantity}x)` : ""}
                </span>

                <span className="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-300">
                  {item.status}
                </span>
              </div>

              <p className="mt-1 text-sm text-slate-400">
                Zuständig:{" "}
                {getPersonName(item.expand?.assigned_person) || "noch offen"}
              </p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default PackingList;