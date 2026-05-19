import { useEffect, useState } from 'react';
import AppHeader from '../components/AppHeader';
import FestivalCard from "../components/festivals/FestivalCard";
import { loadFestivalData } from "../services/festivalService";
import GroupCard from "../components/groups/GroupCard";
import MembersList from "../components/groups/MembersList";
import PackingList from "../components/packing/PackingList";
import CarpoolsList from "../components/carpools/CarpoolsList";
import { buildGroupData } from "../utils/groupData";

export default function DashboardPage() {
  const [festivals, setFestivals] = useState([]);
  const [groups, setGroups] = useState([]);
  const [members, setMembers] = useState([]);
  const [packingItems, setPackingItems] = useState([]);
  const [carpools, setCarpools] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await loadFestivalData();

setFestivals(data.festivals);
setGroups(data.groups);
setMembers(data.members);
setPackingItems(data.packingItems);
setCarpools(data.carpools);

      } catch (error) {
        console.error('Fehler beim Laden:', error);
      }
    };

    loadData();
  }, []);

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto max-w-5xl px-4 py-10">
        <AppHeader />

        <section className="space-y-6">
          {festivals.map((festival) => {
            const festivalGroups = groups.filter((group) => group.festival === festival.id);

            return (
  <FestivalCard key={festival.id} festival={festival}>
                  <h3 className="text-lg font-semibold text-slate-200">Gruppen</h3>

                  <div className="mt-4 grid gap-4">
                    {festivalGroups.map((group) => {
                      const groupData = buildGroupData(
  group,
  members,
  packingItems,
  carpools
);
                      return (
                        <GroupCard key={group.id} group={group}>

                          <div className="mt-5 grid gap-5 md:grid-cols-2">
                      <MembersList members={groupData.members} />

                       <PackingList items={groupData.packingItems} />
                          </div>

                          <CarpoolsList carpools={groupData.carpools} />
                        </GroupCard>
                      );
                    })}
                </div>
              </FestivalCard>
            );
          })}
        </section>
      </div>
    </main>
  );
}
