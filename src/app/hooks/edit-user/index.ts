import { useParams, useRouter } from "next/navigation";
import React, { startTransition } from "react";
import { saveEditProfile } from "../../actions/save-profile";
import { compressFiles } from "../../lib/utilts";
import { useCustomAct } from "../http";
import { useForm } from "../useForm";

export interface EditUserForm {
  name: string;
  description: string;
  photo: string;
  openModalEditUser: boolean;
}

export function useEditUser() {
  const { profileId } = useParams();
  const router = useRouter();
  const formEditUser = useForm<EditUserForm>({
    name: "",
    description: "",
    photo: "",
    openModalEditUser: false,
  });

  const handleSetProfilePhotoInput = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0] ?? null;

      if (file) {
        if (formEditUser.value.photo) {
          URL.revokeObjectURL(formEditUser.value.photo);
        }
        const photoUrl = URL.createObjectURL(file);
        formEditUser.set("photo")(photoUrl);
      }
    },
    [formEditUser.value]
  );

  const editUserAction = useCustomAct(async () => {
    const imagesInput = document.getElementById(
      "profile-pic-input"
    ) as HTMLInputElement;

    if (!imagesInput.files?.length) return;

    const compressedFile = await compressFiles(Array.from(imagesInput.files));

    const formData = new FormData();

    formData.append("file", compressedFile[0]!);
    formData.append("profileId", String(profileId));
    formData.append("name", formEditUser.value.name);
    formData.append("description", formEditUser.value.description);

    await saveEditProfile(formData);

    startTransition(() => {
      formEditUser.reset();
      router.refresh();
    });
  });

  const handleSaveEditUser = React.useCallback(() => {
    editUserAction();
  }, [editUserAction, formEditUser.value, profileId]);

  return {
    editUserAction,
    formEditUser,
    handleSaveEditUser,
    handleSetProfilePhotoInput,
  };
}
