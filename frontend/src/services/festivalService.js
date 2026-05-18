import pb from "../lib/pocketbase";

export async function loadFestivalData() {
  const festivalRecords = await pb
    .collection("festivals")
    .getFullList({
      sort: "-created",
    });

  const groupRecords = await pb
    .collection("groups")
    .getFullList({
      sort: "name",
    });

  const memberRecords = await pb
    .collection("group_members")
    .getFullList({
      sort: "created",
      expand: "person",
    });

  const packingRecords = await pb
    .collection("packing_items")
    .getFullList({
      sort: "item_name",
      expand: "assigned_person",
    });

  const carpoolRecords = await pb
    .collection("carpools")
    .getFullList({
      sort: "departure_time",
      expand: "driver",
    });

  return {
    festivals: festivalRecords,
    groups: groupRecords,
    members: memberRecords,
    packingItems: packingRecords,
    carpools: carpoolRecords,
  };
}