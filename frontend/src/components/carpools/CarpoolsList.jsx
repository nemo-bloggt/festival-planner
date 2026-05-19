import {
  formatDate,
  getPersonName,
  cleanHtmlText,
} from "../../utils/formatters";

function CarpoolsList({ carpools }) {
  return (
    <section className="mt-6">
      <h5 className="mb-3 text-sm font-semibold uppercase tracking-wider text-slate-400">
        Fahrgemeinschaften
      </h5>

      {carpools.length === 0 ? (
        <p className="text-slate-500">Noch keine Fahrgemeinschaften.</p>
      ) : (
        <div className="grid gap-3 md:grid-cols-2">
          {carpools.map((carpool) => (
            <div
              key={carpool.id}
              className="rounded-xl border border-slate-800 bg-slate-900 px-4 py-4"
            >
              <div className="flex items-center justify-between gap-3">
                <h6 className="font-bold">
                  🚗 {getPersonName(carpool.expand?.driver)}
                </h6>

                <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-semibold text-emerald-300">
                  {carpool.available_seats} Plätze frei
                </span>
              </div>

              <p className="mt-3 text-sm text-slate-400">
                <span className="font-semibold text-slate-200">Abfahrt:</span>{" "}
                {carpool.departure_location || "noch offen"}
              </p>

              <p className="mt-1 text-sm text-slate-400">
                <span className="font-semibold text-slate-200">Zeit:</span>{" "}
                {formatDate(carpool.departure_time)}
              </p>

              {carpool.notes && (
                <p className="mt-3 rounded-lg bg-slate-950 px-3 py-2 text-sm text-slate-400">
                  {cleanHtmlText(carpool.notes)}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default CarpoolsList;