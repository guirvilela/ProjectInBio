import Link from "next/link";
import { redirect } from "next/navigation";
import { ProjectCard } from "../../components/commons/project-card";
import { TotalVisits } from "../../components/commons/total-visits";
import { NewProject } from "../../components/pages/profileId-page/new-project";
import { UserCard } from "../../components/pages/profileId-page/user-card";
import { useProjects } from "../../hooks/projects";
import { getDownloadURL } from "../../lib/firebase";

export interface ProfilePageProps {
  params: Promise<{ profileId: string }>;
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  const { session, projectsAction, isOwner, profileId, profileData } =
    await useProjects({ params });

  const userPhotoUrl = profileData.imagePath
    ? await getDownloadURL(profileData.imagePath)
    : null;

  if (isOwner && !session?.user.isSubscribed && !session?.user.isTrial) {
    redirect(`/${profileId}/upgrade`);
  }

  console.log(session?.user);

  return (
    <div className="relative h-screen flex p-20 overflow-hidden">
      {session?.user.isTrial && !session.user.isSubscribed && (
        <div className="fixed top-0 left-0 w-full flex justify-center items-center gap-1 py-2 bg-background-tertiary">
          <span>Você está usando a versão trial.</span>

          <Link href={`${profileId}/upgrade`}>
            <button className="text-accent-green font-bold">
              Faça o upgrade agora
            </button>
          </Link>
        </div>
      )}

      <div className="w-1/2 flex justify-center h-min">
        <UserCard
          isOwner={isOwner}
          socialMedias={profileData.socialMedias}
          personalLinks={profileData.links}
          profileData={profileData}
          userPhoto={userPhotoUrl ? userPhotoUrl : undefined}
        />
      </div>

      <div className="w-full flex justify-center content-start gap-4 flex-wrap overflow-y-auto">
        {projectsAction.map(async (project) => (
          <ProjectCard
            key={project.id}
            project={project}
            image={await getDownloadURL(project.imagePath)}
            isOwner={isOwner}
          />
        ))}

        {isOwner && <NewProject profileId={profileId} />}
      </div>

      {isOwner && (
        <div className="absolute bottom-4 right-0 left-0 w-min mx-auto">
          <TotalVisits visits={profileData.totalVisits} />
        </div>
      )}
    </div>
  );
}
