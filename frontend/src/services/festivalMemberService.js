import pb from "../lib/pocketbase";


export async function loadFestivalMembers(festivalId) {
  return await pb.collection("festival_members").getFullList({
    filter: `festival="${festivalId}"`,
    expand: "person",
    sort: "created",
  });
}

export async function addFestivalMember({ festival, person, role = "member" }) {
  return await pb.collection("festival_members").create({
    festival,
    person,
    role,
  });
}

export async function updateFestivalMemberRole(id, role) {
  return await pb.collection("festival_members").update(id, {
    role,
  });
}

export async function removeFestivalMember(id) {
  return await pb.collection("festival_members").delete(id);
}