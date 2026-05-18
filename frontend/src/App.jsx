import { useEffect, useState } from 'react';
import pb from './pocketbase';

function App() {
  const [festivals, setFestivals] = useState([]);
  const [groups, setGroups] = useState([]);
  const [members, setMembers] = useState([]);
  const [packingItems, setPackingItems] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const festivalRecords = await pb.collection('festivals').getFullList({ sort: '-created' });
        const groupRecords = await pb.collection('groups').getFullList({ sort: 'name' });
        const memberRecords = await pb.collection('group_members').getFullList({
          sort: 'created',
          expand: 'person',
        });
        const packingRecords = await pb.collection('packing_items').getFullList({
          sort: 'item_name',
          expand: 'assigned_person',
        });

        setFestivals(festivalRecords);
        setGroups(groupRecords);
        setMembers(memberRecords);
        setPackingItems(packingRecords);
      } catch (error) {
        console.error('Fehler beim Laden:', error);
      }
    };

    loadData();
  }, []);

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto max-w-5xl px-4 py-10">
        <header className="mb-10">
          <p className="text-sm font-semibold uppercase tracking-widest text-emerald-400">
            Festival Crew Planning
          </p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight md:text-6xl">
            Festival Planner
          </h1>
          <p className="mt-4 max-w-2xl text-slate-400">
            Festivals, Gruppen, Mitglieder und Mitbringlisten an einem Ort.
          </p>
        </header>

        <section className="space-y-6">
          {festivals.map((festival) => {
            const festivalGroups = groups.filter((group) => group.festival === festival.id);

            return (
              <article
                key={festival.id}
                className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 shadow-xl"
              >
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  <div>
                    <h2 className="text-2xl font-bold">{festival.name}</h2>
                    <p className="mt-2 text-slate-400">
                      <span className="font-semibold text-slate-200">Ort:</span>{' '}
                      {festival.location}
                    </p>
                  </div>

                  {festival.website && (
                    <a
                      href={festival.website}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-full bg-emerald-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400"
                    >
                      Website öffnen
                    </a>
                  )}
                </div>

                <div className="mt-8">
                  <h3 className="text-lg font-semibold text-slate-200">Gruppen</h3>

                  <div className="mt-4 grid gap-4">
                    {festivalGroups.map((group) => {
                      const groupMembers = members.filter((member) => member.group === group.id);
                      const groupPackingItems = packingItems.filter((item) => item.group === group.id);

                      return (
                        <div
                          key={group.id}
                          className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5"
                        >
                          <h4 className="text-xl font-bold text-emerald-300">{group.name}</h4>

                          <div className="mt-5 grid gap-5 md:grid-cols-2">
                            <section>
                              <h5 className="mb-3 text-sm font-semibold uppercase tracking-wider text-slate-400">
                                Mitglieder
                              </h5>

                              {groupMembers.length === 0 ? (
                                <p className="text-slate-500">Noch keine Personen.</p>
                              ) : (
                                <ul className="space-y-2">
                                  {groupMembers.map((member) => (
                                    <li
                                      key={member.id}
                                      className="flex items-center justify-between rounded-xl bg-slate-900 px-4 py-3"
                                    >
                                      <span>{getPersonName(member.expand?.person)}</span>
                                      <span className="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-300">
                                        {member.role}
                                      </span>
                                    </li>
                                  ))}
                                </ul>
                              )}
                            </section>

                            <section>
                              <h5 className="mb-3 text-sm font-semibold uppercase tracking-wider text-slate-400">
                                Mitbringliste
                              </h5>

                              {groupPackingItems.length === 0 ? (
                                <p className="text-slate-500">Noch keine Einträge.</p>
                              ) : (
                                <ul className="space-y-2">
                                  {groupPackingItems.map((item) => (
                                    <li
                                      key={item.id}
                                      className="rounded-xl bg-slate-900 px-4 py-3"
                                    >
                                      <div className="flex items-center justify-between gap-3">
                                        <span className="font-medium">
                                          {item.item_name}
                                          {item.quantity ? ` (${item.quantity}x)` : ''}
                                        </span>
                                        <span className="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-300">
                                          {item.status}
                                        </span>
                                      </div>
                                      <p className="mt-1 text-sm text-slate-400">
                                        Zuständig:{' '}
                                        {getPersonName(item.expand?.assigned_person) || 'noch offen'}
                                      </p>
                                    </li>
                                  ))}
                                </ul>
                              )}
                            </section>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </article>
            );
          })}
        </section>
      </div>
    </main>
  );
}

function getPersonName(person) {
  if (Array.isArray(person)) return person[0]?.name || '';
  return person?.name || '';
}

export default App;