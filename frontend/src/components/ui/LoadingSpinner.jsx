export default function LoadingSpinner({
  text = "Lade...",
}) {
  return (
    <div className="flex items-center justify-center py-10">
      <div className="flex items-center gap-3 text-slate-300">
        <div className="h-5 w-5 animate-spin rounded-full border-2 border-slate-600 border-t-blue-500" />

        <span>{text}</span>
      </div>
    </div>
  );
}