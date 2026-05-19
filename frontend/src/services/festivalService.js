import pb from "../lib/pocketbase";

export async function loadFestivals() {
  return await pb.collection("festivals").getFullList({
    sort: "-created",
  });
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

export async function createFestival(data) {
  return await pb.collection("festivals").create({
    ...data,
    created_by: pb.authStore.model.id,
  });
}