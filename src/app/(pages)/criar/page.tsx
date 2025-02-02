import { Rocket } from "lucide-react";
import { Metadata } from "next";
import { Header } from "../../components/lading-page/header";
import { CreateLinkForm } from "../../components/pages/criar-page/create-link-form";

export const metadata: Metadata = {
  title: "Criar",
};

export default function CriarPagina() {
  return (
    <>
      <title>ProjectInBio | Criar link</title>
      <Header />

      <div className="h-screen flex flex-col gap-10 items-center justify-center max-w-xl mx-auto">
        <div className="flex items-center gap-4">
          <h1 className="text-4xl text-white font-bold">Escolha seu link</h1>

          <Rocket className="size-10" />
        </div>

        <CreateLinkForm />
      </div>
    </>
  );
}
