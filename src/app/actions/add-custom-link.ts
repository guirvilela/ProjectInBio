"use server";

import { PersonalLinks } from "../hooks/personal-link";
import { auth } from "../lib/auth";
import { db } from "../lib/firebase";

interface AddCustomLinksProps {
  links: PersonalLinks[];
  profileId: string;
}

export async function addCustomLinks({
  links,
  profileId,
}: AddCustomLinksProps) {
  const session = await auth();

  if (!session) return;

  try {
    await db.collection("profiles").doc(profileId).update({
      links,
    });
  } catch (error) {
    console.error(error);
  }
}
