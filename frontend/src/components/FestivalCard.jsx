function FestivalCard({ festival, children }) {
  return (
    <article className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 shadow-xl">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <h2 className="text-2xl font-bold">{festival.name}</h2>
          <p className="mt-2 text-slate-400">
            <span className="font-semibold text-slate-200">Ort:</span>{" "}
            {festival.location}
          </p>
        </div>

        {festival.website && (
          <a
            href={festival.website}
            target="_blank"
            rel="noreferrer"
            className="rounded-full bg-emerald-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400"
          >
            Website öffnen
          </a>
        )}
      </div>

      <div className="mt-8">{children}</div>
    </article>
  );
}

export default FestivalCard;