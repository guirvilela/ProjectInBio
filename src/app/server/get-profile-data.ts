import "server-only";
import { PersonalLinks } from "../hooks/personal-link";
import { db } from "../lib/firebase";

export interface SocialMedias {
  facebook?: string;
  github?: string;
  instagram?: string;
  linkedin?: string;
  twitter?: string;
}

export interface ProfileData {
  userId: string;
  totalVisits: number;
  createdAt: number;
  socialMedias?: SocialMedias;
  links: PersonalLinks[];
  name?: string;
  imagePath: string;
  description: string;
}

export interface ProjectsData {
  id: string;
  userId: string;
  projectName: string;
  projectDescription: string;
  projectUrl: string;
  imagePath: string;
  createdAt: number;
  totalVisits?: number;
}

export async function getProfileData(
  profileId: string
): Promise<ProfileData | null> {
  const snapshot = await db.collection("profiles").doc(profileId).get();

  return snapshot.exists ? (snapshot.data() as ProfileData) : null;
}

export async function getProfileProjects(profileId: string) {
  const snapshot = await db
    .collection("projects")
    .doc(profileId)
    .collection("projects")
    .get();

  return snapshot.docs.map((doc) => doc.data()) as ProjectsData[];
}
