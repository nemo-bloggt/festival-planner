function GroupCard({ group, children }) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5">
      <h4 className="text-xl font-bold text-emerald-300">{group.name}</h4>

      {children}
    </div>
  );
}

export default GroupCard;