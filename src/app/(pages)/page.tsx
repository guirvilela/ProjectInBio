import { Metadata } from "next";
import { FAQ } from "../components/lading-page/faq";
import { Header } from "../components/lading-page/header";
import { Hero } from "../components/lading-page/hero";
import { Pricing } from "../components/lading-page/pricing";
import { VideoExplanation } from "../components/lading-page/video-explanation";

export const metadata: Metadata = {
  title: "ProjectInBio | Home",
  description:
    "ProjectInBio é um portal para gerenciar seus projetos, redes sociais e muito mais.",
};

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto">
      <Header />
      <Hero />
      <VideoExplanation />

      <Pricing />
      <FAQ />
    </div>
  );
}
