import { useEffect, useMemo, useRef, useState } from "react";
import { loadPeople } from "../../services/personService";

export default function PersonSelect({
  value,
  onChange,
  placeholder = "Person suchen...",
}) {
  const [people, setPeople] = useState([]);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    async function fetchPeople() {
      const data = await loadPeople();
      setPeople(data.filter((person) => person.active !== false));
    }

    fetchPeople();
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (!wrapperRef.current) return;

      if (!wrapperRef.current.contains(event.target)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const selectedPerson = people.find((person) => person.id === value);

  const filteredPeople = useMemo(() => {
    const query = search.toLowerCase().trim();

    if (!query) return people;

    return people.filter((person) => {
      const name = person.name?.toLowerCase() || "";
      const email = person.email?.toLowerCase() || "";
      const phone = person.phone?.toLowerCase() || "";

      return (
        name.includes(query) ||
        email.includes(query) ||
        phone.includes(query)
      );
    });
  }, [people, search]);

  function handleSelect(person) {
    onChange(person.id);
    setSearch("");
    setOpen(false);
  }

  return (
    <div ref={wrapperRef} className="relative flex-1 min-w-[240px]">
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        className="w-full rounded-xl bg-slate-800 px-4 py-2 text-left text-slate-100 ring-1 ring-slate-700 hover:bg-slate-700"
      >
        {selectedPerson ? selectedPerson.name : "Person auswählen"}
      </button>

      {open && (
        <div className="absolute z-20 mt-2 w-full rounded-xl border border-slate-700 bg-slate-900 p-2 shadow-xl">
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder={placeholder}
            className="mb-2 w-full rounded-lg bg-slate-800 px-3 py-2 text-sm text-slate-100 outline-none ring-1 ring-slate-700 focus:ring-slate-500"
            autoFocus
          />

          <div className="max-h-64 overflow-y-auto">
            {filteredPeople.length === 0 ? (
              <p className="px-3 py-2 text-sm text-slate-400">
                Keine Person gefunden.
              </p>
            ) : (
              filteredPeople.map((person) => (
                <button
                  key={person.id}
                  type="button"
                  onClick={() => handleSelect(person)}
                  className="block w-full rounded-lg px-3 py-2 text-left hover:bg-slate-800"
                >
                  <p className="text-sm font-medium text-slate-100">
                    {person.name}
                    {person.has_car && (
                      <span className="ml-2 text-xs text-emerald-400">
                        Auto
                      </span>
                    )}
                  </p>
                  <p className="text-xs text-slate-400">{person.email}</p>
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}