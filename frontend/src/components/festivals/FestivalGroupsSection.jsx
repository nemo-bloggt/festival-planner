import GroupCard from "../GroupCard";
import MembersList from "../MembersList";
import PackingList from "../PackingList";
import CarpoolsList from "../CarpoolsList";
import { buildGroupData } from "../../utils/groupData";

export default function FestivalGroupsSection({
  groups,
  members,
  packingItems,
  carpools,
}) {
  return (
    <section className="mt-8 space-y-6">
      <h2 className="text-xl font-semibold">Gruppen</h2>

      {groups.map((group) => {
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
    </section>
  );
}