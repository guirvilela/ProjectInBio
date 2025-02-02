import { SocialMediaForm } from "@/src/app/hooks/social-media";
import { Form } from "@/src/app/hooks/useForm";
import {
  Facebook,
  Github,
  Instagram,
  Linkedin,
  Loader2,
  Twitter,
} from "lucide-react";
import { Button } from "../../../ui/button";
import { Input } from "../../../ui/input";
import { Modal } from "../../../ui/modal";

interface ModalAddSocialMedia {
  form: Form<SocialMediaForm>;
  onAddSocialMedia: () => void;
}

export function ModalAddSocialMedia({
  form,
  onAddSocialMedia,
}: ModalAddSocialMedia) {
  return (
    <Modal
      isOpen={form.value.modalSocialMedia}
      onClose={() => form.set("modalSocialMedia")(false)}
    >
      <div className="bg-background-primary p-8 rounded-[20px] flex flex-col justify-between gap-10 w-[514px]">
        <p className="text-white font-bold text-xl">Adicionar redes sociais</p>

        <div className="flex flex-col gap-4 ">
          <div className="flex items-center gap-2 w-full">
            <Github />
            <Input
              value={form.value.github}
              onChange={(v) => form.set("github")(v.target.value)}
              placeholder="Link Github"
            />
          </div>

          <div className="flex items-center gap-2 w-full">
            <Instagram />
            <Input
              value={form.value.instagram}
              onChange={(v) => form.set("instagram")(v.target.value)}
              placeholder="Link Instagram"
            />
          </div>

          <div className="flex items-center gap-2 w-full">
            <Facebook />
            <Input
              value={form.value.facebook}
              onChange={(v) => form.set("facebook")(v.target.value)}
              placeholder="Link Facebook"
            />
          </div>

          <div className="flex items-center gap-2 w-full">
            <Linkedin />
            <Input
              value={form.value.linkedin}
              onChange={(v) => form.set("linkedin")(v.target.value)}
              placeholder="Link Linkedin"
            />
          </div>

          <div className="flex items-center gap-2 w-full">
            <Twitter />
            <Input
              value={form.value.twitter}
              onChange={(v) => form.set("twitter")(v.target.value)}
              placeholder="Link Twitter"
            />
          </div>
        </div>

        <footer className="flex gap-4 justify-end">
          <Button
            variant="ghost"
            onClick={() => {
              form.reset();
            }}
          >
            Voltar
          </Button>
          <Button
            className="font-bold text-white"
            disabled={form.value.isCreatingSocialMedia}
            onClick={onAddSocialMedia}
          >
            {form.value.isCreatingSocialMedia ? (
              <Loader2 className="animate-spin" />
            ) : (
              <span>Salvar</span>
            )}
          </Button>
        </footer>
      </div>
    </Modal>
  );
}
