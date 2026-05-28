export default function FestivalSettingsNavigation({ activeTab, onTabChange }) {
  const tabs = [
  { id: "general", label: "Allgemein" },
  { id: "members", label: "Mitglieder" },
  { id: "invites", label: "Einladungen" },
  { id: "permissions", label: "Berechtigungen" },
  { id: "danger", label: "Danger Zone" },
];

  return (
    <nav className="mt-8 flex flex-wrap gap-2">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;

        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onTabChange(tab.id)}
            className={
              isActive
                ? "rounded-xl bg-indigo-600 px-4 py-2 text-sm font-medium text-white"
                : "rounded-xl bg-slate-800 px-4 py-2 text-sm font-medium text-slate-300 hover:bg-slate-700"
            }
          >
            {tab.label}
          </button>
        );
      })}
    </nav>
  );
}