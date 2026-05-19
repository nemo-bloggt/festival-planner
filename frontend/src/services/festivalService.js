import pb from "../lib/pocketbase";

export async function loadFestivalData() {
  const festivalRecords = await pb.collection("festivals").getFullList({
    sort: "-created",
  });

  const groupRecords = await pb.collection("groups").getFullList({
    sort: "name",
  });

  const memberRecords = await pb.collection("group_members").getFullList({
    sort: "created",
    expand: "person",
  });

  const packingRecords = await pb.collection("packing_items").getFullList({
    sort: "item_name",
    expand: "assigned_person",
  });

  const carpoolRecords = await pb.collection("carpools").getFullList({
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

export async function loadFestivalById(festivalId) {
  const festival = await pb.collection("festivals").getOne(festivalId);

  const groups = await pb.collection("groups").getFullList({
    filter: `festival = "${festivalId}"`,
    sort: "name",
  });

  const groupIds = groups.map((group) => group.id);

  const groupFilter = groupIds
    .map((id) => `group = "${id}"`)
    .join(" || ");

  const members = groupFilter
    ? await pb.collection("group_members").getFullList({
        filter: groupFilter,
        sort: "created",
        expand: "person",
      })
    : [];

  const packingItems = groupFilter
    ? await pb.collection("packing_items").getFullList({
        filter: groupFilter,
        sort: "item_name",
        expand: "assigned_person",
      })
    : [];

  const carpools = groupFilter
    ? await pb.collection("carpools").getFullList({
        filter: groupFilter,
        sort: "departure_time",
        expand: "driver",
      })
    : [];

  return {
    festival,
    groups,
    members,
    packingItems,
    carpools,
  };
}