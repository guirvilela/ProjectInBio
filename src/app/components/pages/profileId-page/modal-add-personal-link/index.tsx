import { Form } from "@/src/app/hooks/useForm";
import { Modal } from "../../../ui/modal";

interface ModalAddPersonalLinkProps {
  form: Form<any>;
}

export function ModalAddPersonalLink({ form }: ModalAddPersonalLinkProps) {
  return (
    <Modal
      isOpen={form.value.modalPersonalLink}
      onClose={() => form.set("modalPersonalLink")(false)}
    >
      <div className="bg-background-primary p-8 rounded-[20px] flex flex-col justify-between gap-10 w-[514px]">
        <p className="text-white font-bold text-xl">Adicionar redes sociais</p>
      </div>
    </Modal>
  );
}
