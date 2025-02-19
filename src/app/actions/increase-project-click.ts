"use server";

import { FieldValue } from "firebase-admin/firestore";
import { db } from "../lib/firebase";

export async function increaseProjectVisits(
  projectId: string,
  profileId: string
) {
  const projectRef = db
    .collection("profiles")
    .doc(profileId)
    .collection("projects")
    .doc(projectId);

  await db.runTransaction(async (transaction) => {
    const projectDoc = await transaction.get(projectRef);

    if (!projectDoc.exists) return;

    transaction.update(projectRef, {
      clicks: FieldValue.increment(1),
    });
  });
}
