export default function FestivalDetailHeader({ festival }) {
  return (
    <header className="mt-6 rounded-2xl border border-slate-800 bg-slate-900 p-6">
      <h1 className="text-3xl font-bold">{festival.name}</h1>

      <p className="mt-2 text-slate-400">
        {festival.location}
      </p>
    </header>
  );
}