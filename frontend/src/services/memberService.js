import pb from "../lib/pocketbase";

export async function loadPeople() {
  return await pb.collection("people").getFullList({
    sort: "name",
  });
}

export async function createGroupMember(data) {
  return await pb.collection("group_members").create(data);
}

export async function deleteGroupMember(memberId) {
  return await pb.collection("group_members").delete(memberId);
}