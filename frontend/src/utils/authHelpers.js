import pb from "../lib/pocketbase";

export function getCurrentUser() {
  return pb.authStore.record;
}

export function getCurrentUserId() {
  return pb.authStore.record?.id || null;
}

export function getCurrentPersonId() {
  console.log("AUTH RECORD:", pb.authStore.record);
  const person = pb.authStore.record?.person;

  if (Array.isArray(person)) {
    return person[0] || null;
  }

  return person || null;
}

export function isLoggedIn() {
  return pb.authStore.isValid;
}

export function isFestivalAdmin(festivalMembers, currentPersonId) {
  return festivalMembers.some(
    (member) =>
      member.person === currentPersonId &&
      member.role === "festival_admin"
  );
}