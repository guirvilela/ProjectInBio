"use client";

import Link from "next/link";
import { ProjectsData } from "../../server/get-profile-data";

interface ProjectCardProps {
  project: ProjectsData;
  image: string;
}

export function ProjectCard({ project, image }: ProjectCardProps) {
  const projectUrl = project.projectUrl;

  const projectFormatted = project.projectUrl.startsWith("http")
    ? projectUrl
    : `https://${projectUrl}`;

  function handleClickProject() {
    console.log("CLICKED");
  }

  return (
    <Link href={projectFormatted} target="_blank" onClick={handleClickProject}>
      <div className="w-[340px] h-[132px] flex gap-5 bg-background-secondary p-3 rounded-[20px] border border-transparent hover:border-border-secondary">
        <div className="size-24 rounded-md overflow-hidden flex shrink-0">
          <img
            src={image}
            alt="projeto"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex flex-col gap-2">
          <span className="uppercase text-xs font-bold text-accent-green">
            {project.totalVisits} clique {project.totalVisits === 1 ? "" : "s"}
          </span>
          <div className="flex flex-col ">
            <span className="text-white font-bold">{project.projectName}</span>
            <p className=" text-content-body text-sm line-clamp-2">
              {project.projectDescription}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}
