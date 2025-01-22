interface ProjectCardProps {
  image: string;
  qtdCliks: number;
  projectName: string;
  description: string;
}

export function ProjectCard({
  image,
  description,
  projectName,
  qtdCliks,
}: ProjectCardProps) {
  return (
    <div className="w-[340px] h-[132px] flex gap-5 bg-background-secondary p-3 rounded-[20px] border border-transparent hover:border-border-secondary">
      <div className="size-24 rounded-md overflow-hidden flex shrink-0">
        <img src={image} alt="projeto" className="w-full h-full object-cover" />
      </div>

      <div className="flex flex-col gap-2">
        <span className="uppercase text-xs font-bold text-accent-green">
          {qtdCliks} clique {qtdCliks === 1 ? "" : "s"}
        </span>
        <div className="flex flex-col ">
          <span className="text-white font-bold">{projectName}</span>
          <p className=" text-content-body text-sm line-clamp-2">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}
