"use client";

import { PersonalLinkForm } from "@/src/app/hooks/personal-link";
import { Form } from "@/src/app/hooks/useForm";
import { Loader2, Plus, Trash } from "lucide-react";
import { Button } from "../../../ui/button";
import { Input } from "../../../ui/input";
import { Modal } from "../../../ui/modal";

interface ModalAddPersonalLinkProps {
  form: Form<PersonalLinkForm>;
  onSavePersonalLink: () => void;
  onAddPersonalLink: () => void;
  onRemovePersonalLink: (index: number) => void;
}

export function ModalAddPersonalLink({
  form,
  onSavePersonalLink,
  onAddPersonalLink,
  onRemovePersonalLink,
}: ModalAddPersonalLinkProps) {
  return (
    <Modal
      isOpen={form.value.modalPersonalLink}
      onClose={() => form.set("modalPersonalLink")(false)}
    >
      <div className="bg-background-primary p-8 rounded-[20px] flex flex-col justify-between gap-10 w-[714px]">
        <div className="flex justify-between items-center">
          <p className="text-white font-bold text-xl">
            Adicionar link personalizado
          </p>

          {form.value.links.length < 3 && (
            <Button onClick={onAddPersonalLink}>
              <Plus />
            </Button>
          )}
        </div>

        <div className="flex flex-col gap-4">
          {form.value.links.map((link, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="flex flex-col w-full gap-1">
                <label className="pl-1">Título do link</label>
                <Input
                  placeholder="Digite o título"
                  value={link.title}
                  onChange={(e) => {
                    const newLinks = [...form.value.links];
                    newLinks[i] = { ...newLinks[i], title: e.target.value };
                    form.setAll({ links: newLinks });
                  }}
                />
              </div>

              <div className="flex flex-col w-full gap-1">
                <label className="font-bold pl-1">Link</label>
                <Input
                  placeholder="Inserir URL"
                  value={link.link}
                  onChange={(e) => {
                    const newLinks = [...form.value.links];
                    newLinks[i] = { ...newLinks[i], link: e.target.value };
                    form.setAll({ links: newLinks });
                  }}
                />
              </div>

              <Button
                onClick={() => onRemovePersonalLink(i)}
                className="mt-6"
                disabled={
                  !form.value.links[i].title || !form.value.links[i].link
                }
              >
                <Trash size={20} />
              </Button>
            </div>
          ))}
        </div>

        <footer className="flex gap-4 justify-end">
          <Button
            variant="ghost"
            onClick={() => form.set("modalPersonalLink")(false)}
          >
            Voltar
          </Button>
          <Button
            onClick={onSavePersonalLink}
            disabled={
              form.value.links.length === 0 ||
              form.value.links.some((link) => !link.title || !link.link)
            }
          >
            {form.value.loading ? (
              <Loader2 className="animate-spin" />
            ) : (
              "Salvar"
            )}
          </Button>
        </footer>
      </div>
    </Modal>
  );
}
