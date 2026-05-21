import { useEffect, useState } from "react";
import {
  loadPeople,
  createPerson,
  updatePerson,
  deletePerson,
} from "../services/personService";

const emptyForm = {
  name: "",
  email: "",
  phone: "",
  has_car: false,
  notes: "",
  active: true,
};

export default function PeoplePage() {
  const [people, setPeople] = useState([]);
  const [formData, setFormData] = useState(emptyForm);
  const [editingPerson, setEditingPerson] = useState(null);
  const [loading, setLoading] = useState(true);

  async function reloadPeople() {
    setLoading(true);
    const data = await loadPeople();
    setPeople(data);
    setLoading(false);
  }

  useEffect(() => {
    reloadPeople();
  }, []);

  function handleChange(event) {
    const { name, value, type, checked } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!formData.name.trim()) return;
    if (!formData.email.trim()) return;

    if (editingPerson) {
      await updatePerson(editingPerson.id, formData);
    } else {
      await createPerson(formData);
    }

    setFormData(emptyForm);
    setEditingPerson(null);
    await reloadPeople();
  }

  function startEdit(person) {
    setEditingPerson(person);

    setFormData({
      name: person.name || "",
      email: person.email || "",
      phone: person.phone || "",
      has_car: Boolean(person.has_car),
      notes: person.notes || "",
      active: person.active ?? true,
    });
  }

  async function handleDelete(person) {
    const confirmed = window.confirm(
      `Person "${person.name}" wirklich löschen?`
    );

    if (!confirmed) return;

    await deletePerson(person.id);
    await reloadPeople();
  }

  function cancelEdit() {
    setEditingPerson(null);
    setFormData(emptyForm);
  }

  return (
    <main className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-100">Personen</h1>
        <p className="mt-1 text-slate-400">
          Personen verwalten, die Gruppen, Fahrgemeinschaften oder Aufgaben zugeordnet werden.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="rounded-2xl bg-slate-900 p-6">
        <h2 className="mb-4 text-lg font-semibold text-slate-100">
          {editingPerson ? "Person bearbeiten" : "Person anlegen"}
        </h2>

        <div className="grid gap-4 md:grid-cols-2">
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
            className="rounded-xl bg-slate-800 px-4 py-2 text-slate-100"
          />

          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="E-Mail"
            className="rounded-xl bg-slate-800 px-4 py-2 text-slate-100"
          />

          <input
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Telefon"
            className="rounded-xl bg-slate-800 px-4 py-2 text-slate-100"
          />

          <div className="flex items-center gap-6 text-slate-100">
            <label className="flex items-center gap-2">
              <input
                name="has_car"
                type="checkbox"
                checked={formData.has_car}
                onChange={handleChange}
              />
              Hat Auto
            </label>

            <label className="flex items-center gap-2">
              <input
                name="active"
                type="checkbox"
                checked={formData.active}
                onChange={handleChange}
              />
              Aktiv
            </label>
          </div>

          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            placeholder="Notizen"
            className="md:col-span-2 rounded-xl bg-slate-800 px-4 py-2 text-slate-100"
          />
        </div>

        <div className="mt-4 flex gap-3">
          <button className="rounded-xl bg-blue-600 px-4 py-2 text-white hover:bg-blue-500">
            {editingPerson ? "Speichern" : "Anlegen"}
          </button>

          {editingPerson && (
            <button
              type="button"
              onClick={cancelEdit}
              className="rounded-xl bg-slate-700 px-4 py-2 text-slate-100 hover:bg-slate-600"
            >
              Abbrechen
            </button>
          )}
        </div>
      </form>

      <section className="rounded-2xl bg-slate-900 p-6">
        <h2 className="mb-4 text-lg font-semibold text-slate-100">
          Personenliste
        </h2>

        {loading ? (
          <p className="text-slate-400">Lade Personen...</p>
        ) : (
          <ul className="space-y-3">
            {people.map((person) => (
              <li
                key={person.id}
                className="flex items-center justify-between rounded-xl bg-slate-800 px-4 py-3"
              >
                <div>
                  <p className="font-medium text-slate-100">{person.name}</p>
                  <p className="text-sm text-slate-400">{person.email}</p>
                  {person.has_car && (
                    <p className="text-sm text-emerald-400">Hat Auto</p>
                  )}
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => startEdit(person)}
                    className="rounded-lg bg-slate-700 px-3 py-1 text-sm text-slate-100"
                  >
                    Bearbeiten
                  </button>

                  <button
                    onClick={() => handleDelete(person)}
                    className="rounded-lg bg-red-600 px-3 py-1 text-sm text-white"
                  >
                    Löschen
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}