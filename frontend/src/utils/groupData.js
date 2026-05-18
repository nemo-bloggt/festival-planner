export function buildGroupData(
  group,
  members,
  packingItems,
  carpools
) {
  return {
    members: members.filter(
      (member) => member.group === group.id
    ),

    packingItems: packingItems.filter(
      (item) => item.group === group.id
    ),

    carpools: carpools.filter(
      (carpool) => carpool.group === group.id
    ),
  };
}