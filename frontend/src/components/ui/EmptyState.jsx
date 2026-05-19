export default function EmptyState({
  title = "Keine Daten vorhanden",
  description = "",
}) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8 text-center">
      <h3 className="text-lg font-semibold text-slate-100">
        {title}
      </h3>

      {description && (
        <p className="mt-2 text-sm text-slate-400">
          {description}
        </p>
      )}
    </div>
  );
}