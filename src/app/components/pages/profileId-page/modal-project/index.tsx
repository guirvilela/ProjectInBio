import { Action } from "@/src/app/hooks/http";
import { ProfileForm } from "@/src/app/hooks/profile";
import { Form } from "@/src/app/hooks/useForm";
import { ArrowUpFromLine, Loader2 } from "lucide-react";
import React from "react";
import { Button } from "../../../ui/button";
import { Input } from "../../../ui/input";
import { TextArea } from "../../../ui/text-area";

interface ModalProjectProps {
  form: Form<ProfileForm>;
  projectAction: Action<unknown>;
  onSetImage: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSaveProject: () => void;
}

export function ModalProject({
  form,
  projectAction,
  onSetImage,
  onSaveProject,
}: ModalProjectProps) {
  function triggerImageInput(id: string) {
    document.getElementById(id)?.click();
  }

  return (
    <div className="bg-background-primary p-8 rounded-[20px] flex flex-col justify-between gap-10">
      <p className="text-white font-bold text-xl">Novo projeto</p>

      <div className="flex gap-10 ">
        <div className="flex flex-col items-center gap-3 text-xs ">
          <div className="w-[320px] h-[320px] rounded-xl bg-background-tertiary overflow-hidden ">
            {form.value.image ? (
              <img
                src={form.value.image ?? null}
                alt="Imagem do projeto"
                className="object-cover object-center w-full h-full"
              />
            ) : (
              <button
                onClick={() => triggerImageInput("image-project-input")}
                className="w-full h-full "
              >
                320x320
              </button>
            )}
          </div>

          <button
            className="text-white flex items-center gap-2"
            onClick={() => triggerImageInput("image-project-input")}
          >
            <ArrowUpFromLine className="size-4" />
            <span className="text-sm">Adicionar imagem</span>
          </button>

          <Input
            type="file"
            id="image-project-input"
            accept="image/*"
            className="hidden"
            onChange={onSetImage}
          />
        </div>

        <div className="flex flex-col gap-4 w-[400px] ">
          <div className="flex flex-col gap-1">
            <label htmlFor="project-name" className="text-white font-bold">
              Título do projeto
            </label>
            <Input
              id="project-name"
              placeholder="Digite o nome do projeto"
              value={form.value.name}
              onChange={(v) => form.set("name")(v.target.value)}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label
              htmlFor="project-description"
              className="text-white font-bold"
            >
              Descrição do projeto
            </label>

            <TextArea
              id="project-description"
              placeholder="Dê uma breve descrição do projeto"
              className="h-36"
              value={form.value.description}
              onChange={(v) => form.set("description")(v.target.value)}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="project-url" className="text-white font-bold">
              URL do projeto
            </label>
            <Input
              id="project-url"
              type="url"
              placeholder="Digite a URL do projeto"
              value={form.value.url}
              onChange={(v) => form.set("url")(v.target.value)}
            />
          </div>
        </div>
      </div>

      <footer className="flex gap-4 justify-end">
        <Button
          variant="ghost"
          onClick={() => {
            form.reset();
            projectAction.reset();
          }}
        >
          Voltar
        </Button>
        <Button
          className="font-bold text-white"
          disabled={projectAction.loading}
          onClick={onSaveProject}
        >
          {projectAction.loading ? (
            <Loader2 className="animate-spin" />
          ) : (
            <span>Salvar</span>
          )}
        </Button>
      </footer>
    </div>
  );
}
