import { EditUserForm } from "@/src/app/hooks/edit-user";
import { Action } from "@/src/app/hooks/http";
import { Form } from "@/src/app/hooks/useForm";
import { ArrowUpFromLine, Loader2 } from "lucide-react";
import { Button } from "../../../ui/button";
import { Input } from "../../../ui/input";
import { Modal } from "../../../ui/modal";
import { TextArea } from "../../../ui/text-area";

interface ModalEditUserCardProps {
  editUserAction: Action<void>;
  formEditUser: Form<EditUserForm>;
  onSaveEditUser: () => void;
  onSetProfilePhoto: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function ModalEditUserCard({
  editUserAction,
  formEditUser,
  onSaveEditUser,
  onSetProfilePhoto,
}: ModalEditUserCardProps) {
  function triggerImageInput(id: string) {
    document.getElementById(id)?.click();
  }

  return (
    <Modal
      isOpen={formEditUser.value.openModalEditUser}
      onClose={() => formEditUser.set("openModalEditUser")(false)}
    >
      <div className="bg-background-primary p-8 rounded-[20px] flex flex-col justify-between gap-10 w-[514px]">
        <p className="text-white font-bold text-xl">
          Editar informações pessoais
        </p>
        <div className="flex gap-10 ">
          <div className=" flex flex-col items-center gap-6 w-full ">
            <div className="flex flex-col items-center justify-center">
              <div className="w-[120px] h-[120px] rounded-full bg-background-tertiary overflow-hidden">
                {formEditUser.value.photo ? (
                  <img
                    src={formEditUser.value.photo ?? null}
                    alt="Foto do usuário"
                    className="object-cover object-center w-full h-full"
                    onClick={() => triggerImageInput("profile-pic-input")}
                  />
                ) : (
                  <button
                    onClick={() => triggerImageInput("profile-pic-input")}
                    className="w-full h-full text-sm "
                  >
                    100x100
                  </button>
                )}
              </div>

              <Button
                variant="ghost"
                className="text-white flex items-center gap-2"
                onClick={() => triggerImageInput("profile-pic-input")}
              >
                <ArrowUpFromLine />
                <span>Adicionar foto</span>
              </Button>

              <Input
                id="profile-pic-input"
                type="file"
                className="hidden"
                accept="image/*"
                onChange={onSetProfilePhoto}
              />
            </div>

            <div className="flex flex-col justify-center items-center gap-4 w-full">
              <div className="flex flex-col gap-2 w-full">
                <label htmlFor="your-name" className="text-white font-bold ">
                  Seu nome
                </label>
                <Input
                  id="your-name"
                  placeholder="Digite seu nome"
                  value={formEditUser.value.name}
                  onChange={(v) => formEditUser.set("name")(v.target.value)}
                />
              </div>

              <div className="flex flex-col gap-2 w-full">
                <label
                  htmlFor="your-description"
                  className="text-white font-bold text-base"
                >
                  Descrição
                </label>
                <TextArea
                  id="your-description"
                  placeholder="Fle um pouco sobre você"
                  className="h-36"
                  value={formEditUser.value.description}
                  onChange={(v) =>
                    formEditUser.set("description")(v.target.value)
                  }
                />
              </div>
            </div>
          </div>
        </div>
        <footer className="flex gap-4 justify-end ">
          <Button
            variant="ghost"
            onClick={() => formEditUser.set("openModalEditUser")(false)}
          >
            Voltar
          </Button>

          <Button onClick={onSaveEditUser} disabled={editUserAction.loading}>
            {editUserAction.loading ? (
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
