import { ProjectCard } from "../commons/project-card";
import { TotalVisits } from "../commons/total-visits";
import { UserCard } from "../pages/profileId-page/user-card";
import { LinkHero } from "./link-hero";

export function Hero() {
  return (
    <div className=" flex h-screen">
      <div className="w-full flex flex-col gap-2 mt-[35vh]">
        <h1 className="text-5xl font-bold text-white leading-[64px]">
          Seus projetos e redes sociais em um único link
        </h1>

        <h2 className="text-xl leading-6">
          Crie sua própria página de projetos e compartilhe eles com o mundo.
          <br />
          Acompanhe o engajamento com Analytics de cliques
        </h2>

        <LinkHero />
      </div>

      <div className="w-full flex items-center justify-center bg-[radial-gradient(circle_at_50%_50%,#4B2DBB,transparent_55%)]">
        <div className="relative">
          <UserCard isHome />

          <div className="absolute bottom-2 -right-[45%]">
            <TotalVisits visits={1042} isHome />
          </div>

          <div className="absolute top-[20%] -left-[45%] -z-10">
            <ProjectCard
              project={{
                id: "project1",
                projectName: "Spotify Clone",
                projectDescription:
                  "Este é um projeto de uma aplicação web clonando o spotify.",
                imagePath: "/project1.jpg",
                projectUrl: "http://",
                userId: "teste",
                totalVisits: 1,
                createdAt: 123,
                clicks: 45,
              }}
              image="/project1.jpg"
              isHome
            />
          </div>

          <div className="absolute -top-[5%] -left-[55%] -z-10">
            <ProjectCard
              project={{
                id: "project2",
                projectName: "Pizzaria online",
                projectDescription:
                  "Este é um projeto de uma aplicação web para gerenciamento e pedidos de uma pizzaria, desenvolvido com React no frontend. A interface é moderna, intuitiva e responsiva, permitindo que os usuários explorem o cardápio, personalizem pizzas, realizem pedidos e acompanhem o status em tempo real.",
                imagePath: "/project1.jpg",
                projectUrl: "http://",
                userId: "teste",
                totalVisits: 1,
                createdAt: 123,
                clicks: 32,
              }}
              isHome
              image="/project2.jpg"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
