import pb from "../lib/pocketbase";

export async function loadFestivalMembers(festivalId) {
  return await pb.collection("festival_members").getFullList({
    filter: `festival="${festivalId}"`,
    expand: "person",
    sort: "created",
  });
}

export async function addFestivalMember({
  festival,
  person,
  role = "member",
}) {
  return await pb.collection("festival_members").create({
    festival,
    person,
    role,
  });
}

async function ensureNotLastFestivalAdmin(memberId) {
  const member = await pb
    .collection("festival_members")
    .getOne(memberId);

  if (member.role !== "festival_admin") {
    return;
  }

  const admins = await pb.collection("festival_members").getFullList({
    filter: `festival="${member.festival}" && role="festival_admin"`,
  });

  if (admins.length <= 1) {
    throw new Error(
      "Der letzte Festival-Admin kann nicht entfernt oder herabgestuft werden."
    );
  }
}

export async function updateFestivalMemberRole(id, role) {
  const currentMember = await pb
    .collection("festival_members")
    .getOne(id);

  const isRemovingFestivalAdmin =
    currentMember.role === "festival_admin" &&
    role !== "festival_admin";

  if (isRemovingFestivalAdmin) {
    await ensureNotLastFestivalAdmin(id);
  }

  return await pb.collection("festival_members").update(id, {
    role,
  });
}

export async function removeFestivalMember(id) {
  await ensureNotLastFestivalAdmin(id);

  return await pb.collection("festival_members").delete(id);
}
