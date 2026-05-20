import pb from "../lib/pocketbase";

export async function createGroup(data) {
  return await pb.collection("groups").create(data);
}