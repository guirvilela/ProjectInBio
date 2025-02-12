"use server";

import { randomUUID } from "crypto";
import { Timestamp } from "firebase-admin/firestore";
import { auth } from "../lib/auth";
import { db, storage } from "../lib/firebase";

export async function saveEditProfile(formData: FormData) {
  const session = await auth();

  if (!session) return;

  try {
    const profileId = formData.get("profileId") as string;
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const file = formData.get("file") as File;

    let imagePath = null;

    const hasFile = file && file.size > 0;

    if (hasFile) {
      const currentProfile = await db
        .collection("profiles")
        .doc(profileId)
        .get();

      const currentImagePath = currentProfile.data()?.imagePath;

      if (currentImagePath) {
        const currentStorageRef = storage.file(currentImagePath);
        const [exists] = await currentStorageRef.exists();

        if (exists) {
          await currentStorageRef.delete();
        }
      }

      const storageRef = storage.file(
        `profile-images/${profileId}/${randomUUID()}`
      );

      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      await storageRef.save(buffer);

      imagePath = storageRef.name;
    }

    await db
      .collection("profiles")
      .doc(profileId)
      .update({
        name,
        description,
        updatedAt: Timestamp.now().toMillis(),
        ...(hasFile && { imagePath }),
      });

    return true;
  } catch (error) {
    console.error("Error saving profile", error);
    return false;
  }
}
