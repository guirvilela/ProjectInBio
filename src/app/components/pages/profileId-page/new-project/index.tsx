"use client";

import { useProfile } from "@/src/app/hooks/profile";
import { Plus } from "lucide-react";
import { Modal } from "../../../ui/modal";
import { ModalProject } from "../modal-project";

interface NewProjectProps {
  profileId: string;
}

export function NewProject({ profileId }: NewProjectProps) {
  const { form, handleImageInput, projectAction, handleSaveProject } =
    useProfile({ profileId });

  return (
    <>
      <button
        onClick={() => form.set("modalOpen")(true)}
        className="w-[340px] h-[132px] rounded-[20px] bg-background-secondary flex items-center gap-2 justify-center hover:border border-dashed border-border-secondary "
      >
        <Plus className="size-10 text-accent-green" />
        <span>Novo projeto</span>
      </button>

      <Modal
        isOpen={form.value.modalOpen}
        onClose={() => {
          form.reset();
          projectAction.reset();
        }}
      >
        <ModalProject
          form={form}
          projectAction={projectAction}
          onSetImage={handleImageInput}
          onSaveProject={handleSaveProject}
        />
      </Modal>
    </>
  );
}
