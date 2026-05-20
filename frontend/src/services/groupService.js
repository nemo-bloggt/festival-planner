import pb from "../lib/pocketbase";

export async function createGroup(data) {
  return await pb.collection("groups").create(data);
}

export async function updateGroup(groupId, data) {
  return await pb.collection("groups").update(groupId, data);
}

export async function deleteGroup(groupId) {
  return await pb.collection("groups").delete(groupId);
}