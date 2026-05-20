import GroupCard from "../groups/GroupCard";
import MembersList from "../groups/MembersList";
import PackingList from "../packing/PackingList";
import CarpoolsList from "../carpools/CarpoolsList";
import { buildGroupData } from "../../utils/groupData";
import SectionTitle from "../ui/SectionTitle";
import EmptyState from "../ui/EmptyState";
import MemberForm from "../groups/MemberForm";

export default function FestivalGroupsSection({
  groups,
  members,
  packingItems,
  carpools,
  people,
  onUpdateGroup,
  onDeleteGroup,
  onAddMember,
  onRemoveMember,
}) {
  return (
    <section className="mt-8 space-y-6">
      <SectionTitle>Gruppen</SectionTitle>
    {groups.length === 0 && (
        <EmptyState
            title="Keine Gruppen vorhanden"
            description="Für dieses Festival wurden noch keine Gruppen angelegt."
  />
)}

    {groups.map((group) => {
        const groupData = buildGroupData(
          group,
          members,
          packingItems,
          carpools
        );

        return (
          <GroupCard
  key={group.id}
  group={group}
  onUpdateGroup={onUpdateGroup}
  onDeleteGroup={onDeleteGroup}
>
            <div className="mt-5 grid gap-5 md:grid-cols-2">
              <MembersList 
              members={groupData.members} 
              onRemoveMember={onRemoveMember}
              />
              <MemberForm
                people={people}
                onAddMember={(memberData) => onAddMember(group.id, memberData)}
              />
              <PackingList items={groupData.packingItems} />
            </div>

            <CarpoolsList carpools={groupData.carpools} />
          </GroupCard>
        );
      })}
    </section>
  );
}