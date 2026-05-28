import pb from "../lib/pocketbase";
import { getCurrentPersonId } from "../utils/authHelpers";

export async function loadFestivals() {
  return await pb.collection("festivals").getFullList({
    sort: "-created",
  });
}

export async function loadMyFestivals() {
  const currentPersonId = getCurrentPersonId();

  if (!currentPersonId) {
    return [];
  }

  const memberships = await pb.collection("festival_members").getFullList({
    filter: `person = "${currentPersonId}"`,
    sort: "-created",
  });

  const festivalIds = memberships.map((membership) => membership.festival);

  if (festivalIds.length === 0) {
    return [];
  }

  const filter = festivalIds
    .map((id) => `id = "${id}"`)
    .join(" || ");

  return await pb.collection("festivals").getFullList({
    filter,
    sort: "-created",
  });
}

export async function loadFestivalById(festivalId) {
  const festival = await pb.collection("festivals").getOne(festivalId);

  return await loadFestivalRelations(festival);
}

export async function loadFestivalBySlug(slug) {
  const festival = await pb.collection("festivals").getFirstListItem(
    `slug = "${slug}"`
  );

  return await loadFestivalRelations(festival);
}

async function loadFestivalRelations(festival) {
  const festivalId = festival.id;

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

export async function updateFestival(festivalId, data) {
  return await pb.collection("festivals").update(festivalId, data);
}

export async function deleteFestival(festivalId) {
  return await pb.collection("festivals").delete(festivalId);
}