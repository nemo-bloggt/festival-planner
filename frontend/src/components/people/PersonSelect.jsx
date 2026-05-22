import { useEffect, useMemo, useRef, useState } from "react";
import { createPerson, loadPeople } from "../../services/personService";

export default function PersonSelect({
  value,
  onChange,
  placeholder = "Person suchen...",
}) {
  const [people, setPeople] = useState([]);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [creating, setCreating] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const [newPerson, setNewPerson] = useState({
    name: "",
    email: "",
  });

  const wrapperRef = useRef(null);

  async function fetchPeople() {
    const data = await loadPeople();
    setPeople(data.filter((person) => person.active !== false));
  }

  useEffect(() => {
    fetchPeople();
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (!wrapperRef.current) return;

      if (!wrapperRef.current.contains(event.target)) {
        setOpen(false);
        setCreating(false);
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

  useEffect(() => {
  setHighlightedIndex(0);
}, [search, open]);

  function handleSelect(person) {
    onChange(person.id);
    setSearch("");
    setOpen(false);
    setCreating(false);
  }

  function handleKeyDown(event) {
  if (!open || creating) return;

  if (event.key === "ArrowDown") {
    event.preventDefault();

    setHighlightedIndex((current) =>
      current < filteredPeople.length - 1 ? current + 1 : current
    );
  }

  if (event.key === "ArrowUp") {
    event.preventDefault();

    setHighlightedIndex((current) =>
      current > 0 ? current - 1 : 0
    );
  }

  if (event.key === "Enter") {
    event.preventDefault();

    const person = filteredPeople[highlightedIndex];

    if (person) {
      handleSelect(person);
    }
  }

  if (event.key === "Escape") {
    setOpen(false);
  }
}

  async function handleCreatePerson() {;

    if (!newPerson.name.trim()) return;
    if (!newPerson.email.trim()) return;

    const createdPerson = await createPerson({
      name: newPerson.name,
      email: newPerson.email,
      active: true,
      has_car: false,
    });

    await fetchPeople();

    onChange(createdPerson.id);
    setNewPerson({ name: "", email: "" });
    setSearch("");
    setCreating(false);
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
          {!creating ? (
            <>
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                onKeyDown={handleKeyDown}
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
                  filteredPeople.map((person, index) => (
                    <button
                      key={person.id}
                      type="button"
                      onClick={() => handleSelect(person)}
                      className={`block w-full rounded-lg px-3 py-2 text-left ${
                      index === highlightedIndex
                      ? "bg-slate-800"
                      : "hover:bg-slate-800"
                      }`}
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

              <button
                type="button"
                onClick={() => {
                  setCreating(true);
                  setNewPerson({
                    name: search,
                    email: "",
                  });
                }}
                className="mt-2 w-full rounded-lg bg-slate-800 px-3 py-2 text-left text-sm text-emerald-400 hover:bg-slate-700"
              >
                + Neue Person anlegen
              </button>
            </>
          ) : (
            <div className="space-y-2">
  <input
    value={newPerson.name}
    onChange={(event) =>
      setNewPerson((current) => ({
        ...current,
        name: event.target.value,
      }))
    }
    placeholder="Name"
    className="w-full rounded-lg bg-slate-800 px-3 py-2 text-sm text-slate-100 outline-none ring-1 ring-slate-700"
    autoFocus
  />

  <input
    type="email"
    value={newPerson.email}
    onChange={(event) =>
      setNewPerson((current) => ({
        ...current,
        email: event.target.value,
      }))
    }
    placeholder="E-Mail"
    className="w-full rounded-lg bg-slate-800 px-3 py-2 text-sm text-slate-100 outline-none ring-1 ring-slate-700"
  />

  <div className="flex gap-2">
    <button
      type="button"
      onClick={handleCreatePerson}
      className="rounded-lg bg-emerald-600 px-3 py-2 text-sm font-medium text-white hover:bg-emerald-500"
    >
      Anlegen
    </button>

    <button
      type="button"
      onClick={() => setCreating(false)}
      className="rounded-lg bg-slate-700 px-3 py-2 text-sm text-slate-100 hover:bg-slate-600"
    >
      Abbrechen
    </button>
  </div>
</div>
          )}
        </div>
      )}
    </div>
  );
}