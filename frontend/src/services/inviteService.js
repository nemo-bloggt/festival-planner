import pb from "../lib/pocketbase";

export async function createInvite(festivalId, role) {
  const token = crypto.randomUUID();

  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 7);

  return await pb.collection("festival_invites").create({
    festival: festivalId,
    token,
    role,
    active: true,
    expires_at: expiresAt.toISOString(),
  });
}

export async function getInviteByToken(token) {
  return await pb.collection("festival_invites").getFirstListItem(
    `token="${token}"`,
    {
      expand: "festival",
    }
  );
}

export async function getFestivalFromInvite(invite) {
  return await pb.collection("festivals").getOne(invite.festival);
}

export async function joinFestivalWithInvite(invite, personId) {
  try {
    await pb.collection("festival_members").getFirstListItem(
      `festival="${invite.festival}" && person="${personId}"`
    );

    throw new Error("ALREADY_MEMBER");
  } catch (error) {
    if (error.message === "ALREADY_MEMBER") {
      throw error;
    }

    if (error.status !== 404) {
      throw error;
    }
  }

  return await pb.collection("festival_members").create({
    festival: invite.festival,
    person: personId,
    role: invite.role,
  });
}