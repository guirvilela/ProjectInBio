import { notFound } from "next/navigation";
import { ProfilePageProps } from "../../(pages)/[profileId]/page";
import { increaseProfileVisits } from "../../actions/increase-profile-visits";
import { auth } from "../../lib/auth";
import {
  getProfileData,
  getProfileProjects,
} from "../../server/get-profile-data";

export async function useProjects({ params }: ProfilePageProps) {
  const session = await auth();
  const { profileId } = await params;

  const profileData = await getProfileData(profileId);

  if (!profileData) return notFound();

  const isOwner = profileData.userId === session?.user?.id;

  const projectsAction = await getProfileProjects(profileId);

  if (!isOwner) await increaseProfileVisits(profileId);

  return {
    projectsAction,
    profileData,
    isOwner,
    profileId,
  };
}
