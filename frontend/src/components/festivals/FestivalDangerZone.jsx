import { useState } from "react";

export default function FestivalDangerZone({ festival, onDeleteFestival }) {
  const [confirmationText, setConfirmationText] = useState("");

  const canDelete = confirmationText === festival.name;

  return (
    <section className="mt-8 rounded-2xl border border-red-900 bg-red-950/30 p-6">
      <h2 className="text-xl font-semibold text-red-300">Danger Zone</h2>

      <p className="mt-2 text-sm text-red-200">
        Kritische Aktionen für dieses Festival. Diese Aktionen können nicht
        einfach rückgängig gemacht werden.
      </p>

      <div className="mt-6 rounded-xl bg-slate-950/60 p-4">
        <h3 className="font-semibold text-red-200">Festival löschen</h3>

        <p className="mt-2 text-sm text-slate-300">
          Um das Festival zu löschen, gib den Namen exakt ein:
          <span className="ml-1 font-semibold text-red-200">
            {festival.name}
          </span>
        </p>

        <input
          type="text"
          value={confirmationText}
          onChange={(event) => setConfirmationText(event.target.value)}
          className="mt-4 w-full rounded-xl bg-slate-900 px-3 py-2 text-sm text-slate-100 ring-1 ring-red-900"
          placeholder={festival.name}
        />

        <button
          type="button"
          disabled={!canDelete}
          onClick={onDeleteFestival}
          className="mt-4 rounded-xl bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-500 disabled:cursor-not-allowed disabled:bg-slate-700 disabled:text-slate-400"
        >
          Festival endgültig löschen
        </button>
      </div>
    </section>
  );
}