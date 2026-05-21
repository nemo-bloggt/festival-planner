import pb from "../lib/pocketbase";

let peopleCache = null;

export async function loadPeople() {
  if (peopleCache) return peopleCache;

  peopleCache = await pb.collection("people").getFullList({
    sort: "name",
  });

  return peopleCache;
}

export function clearPeopleCache() {
  peopleCache = null;
}

export async function createPerson(data) {
  const person = await pb.collection("people").create(data);
  clearPeopleCache();
  return person;
}

export async function updatePerson(id, data) {
  const person = await pb.collection("people").update(id, data);
  clearPeopleCache();
  return person;
}

export async function deletePerson(id) {
  const result = await pb.collection("people").delete(id);
  clearPeopleCache();
  return result;
}