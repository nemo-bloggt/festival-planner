import { useEffect, useState } from "react";

import AppHeader from "../components/AppHeader";
import FestivalCard from "../components/festivals/FestivalCard";
import { loadFestivals } from "../services/festivalService";
import { Link } from "react-router-dom";
import EmptyState from "../components/ui/EmptyState";

export default function DashboardPage() {
  const [festivals, setFestivals] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const festivalRecords = await loadFestivals();
        setFestivals(festivalRecords);
      } catch (error) {
        console.error("Fehler beim Laden:", error);
      }
    };

    loadData();
  }, []);

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto max-w-5xl px-4 py-10">
        <AppHeader />

        <div className="mb-6 flex items-center justify-between">
  <h1 className="text-2xl font-bold">Meine Festivals</h1>

  <Link
    to="/festivals/new"
    className="rounded-lg bg-indigo-600 px-4 py-2 font-medium text-white hover:bg-indigo-500"
  >
    Festival erstellen
  </Link>
</div>

     <section className="space-y-6">
  {festivals.length === 0 ? (
    <EmptyState
      title="Noch keine Festivals"
      description="Erstelle dein erstes Festival und plane Gruppen, Packlisten und Fahrgemeinschaften."
      actionLabel="Festival erstellen"
      actionTo="/festivals/new"
    />
  ) : (
    festivals.map((festival) => (
      <FestivalCard key={festival.id} festival={festival} />
    ))
  )}
</section>
      </div>
    </main>
  );
}