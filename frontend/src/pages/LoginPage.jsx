import { useParams } from "react-router-dom";

export default function FestivalDetailPage() {
  const { festivalId } = useParams();

  return (
    <main className="min-h-screen bg-slate-950 p-10 text-slate-100">
      <h1 className="text-2xl font-bold">Festival Detailseite</h1>
      <p className="mt-4 text-slate-300">Festival-ID: {festivalId}</p>
    </main>
  );
}