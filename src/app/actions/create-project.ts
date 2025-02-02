"use server";

import { randomUUID } from "crypto";
import { Timestamp } from "firebase-admin/firestore";
import { auth } from "../lib/auth";
import { db, storage } from "../lib/firebase";

export async function createProject(formData: FormData) {
  const session = await auth();
  const profileId = formData.get("profileId") as string;
  const projectName = formData.get("name") as string;
  const projectDescription = formData.get("description") as string;
  const projectUrl = formData.get("url") as string;
  const file = formData.get("file") as File;

  const generateId = randomUUID();

  const storageRef = storage.file(`projects-images/${profileId}/${generateId}`);
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  await storageRef.save(buffer);

  const imagePath = storageRef.name;

  try {
    await db
      .collection("projects")
      .doc(profileId)
      .collection("projects")
      .doc(generateId)
      .set({
        userId: session?.user?.id,
        projectName,
        projectDescription,
        projectUrl,
        createdAt: Timestamp.now().toMillis(),
        imagePath,
      });

    return true;
  } catch (error) {
    return false;
  }
}
