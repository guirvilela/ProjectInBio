"use server";

import { Timestamp } from "firebase-admin/firestore";
import { SocialMediaForm } from "../hooks/social-media";
import { auth } from "../lib/auth";
import { db } from "../lib/firebase";

interface createSocialMediaProps extends SocialMediaForm {
  profileId: string;
}

export async function createSocialMedia(params: createSocialMediaProps) {
  const { facebook, github, instagram, linkedin, twitter } = params;

  const session = await auth();

  if (!session) return;

  try {
    await db.collection("profiles").doc(params.profileId).update({
      socialMedias: {
        facebook,
        github,
        instagram,
        linkedin,
        twitter,
      },
      updatedAt: Timestamp.now().toMillis(),
    });
    return true;
  } catch (error) {
    console.error("Error creating social media", error);
    return false;
  }
}
