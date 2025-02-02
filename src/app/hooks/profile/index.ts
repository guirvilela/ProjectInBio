"use client";

import { useRouter } from "next/navigation";
import React, { startTransition } from "react";
import { createProject } from "../../actions/create-project";
import { compressFiles } from "../../lib/utilts";
import { useCustomAct } from "../http";
import { useForm } from "../useForm";

export interface ProfileForm {
  modalOpen: boolean;
  image: string | null;
  name: string;
  description: string;
  url: string;
  loading: boolean;
}

interface useProfileProps {
  profileId: string;
}

export function useProfile({ profileId }: useProfileProps) {
  const router = useRouter();
  const form = useForm<ProfileForm>({
    modalOpen: false,
    image: "",
    name: "",
    description: "",
    url: "",
    loading: false,
  });

  const handleImageInput = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0] ?? null;

      if (file) {
        if (form.value.image) {
          URL.revokeObjectURL(form.value.image);
        }
        const imageUrl = URL.createObjectURL(file);
        form.set("image")(imageUrl);
      }
    },
    [form.value]
  );

  const projectAction = useCustomAct(async () => {
    const imagesInput = document.getElementById(
      "image-project-input"
    ) as HTMLInputElement;

    if (!imagesInput.files?.length) return;

    const compressedFile = await compressFiles(Array.from(imagesInput.files));

    const formData = new FormData();

    formData.append("file", compressedFile[0]!);
    formData.append("profileId", profileId);
    formData.append("name", form.value.name);
    formData.append("description", form.value.description);
    formData.append("url", form.value.url);

    await createProject(formData);

    startTransition(() => {
      form.reset();
      router.refresh();
    });
  });

  const handleSaveProject = React.useCallback(() => {
    projectAction();
  }, [projectAction, form.value]);

  return {
    form,
    projectAction,
    handleImageInput,
    handleSaveProject,
  };
}
