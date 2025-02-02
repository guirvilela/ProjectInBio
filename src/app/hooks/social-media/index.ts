import { useParams, useRouter } from "next/navigation";
import React, { startTransition } from "react";
import { createSocialMedia } from "../../actions/create-social-media";
import { useForm } from "../useForm";

export interface SocialMediaForm {
  github: string;
  linkedin: string;
  twitter: string;
  facebook: string;
  instagram: string;
  modalSocialMedia: boolean;
  isCreatingSocialMedia: boolean;
}

export function useSocialMedia() {
  const { profileId } = useParams();
  const router = useRouter();

  const form = useForm<SocialMediaForm>({
    github: "",
    linkedin: "",
    twitter: "",
    facebook: "",
    instagram: "",
    modalSocialMedia: false,
    isCreatingSocialMedia: false,
  });

  const handleAddSocialMedia = React.useCallback(async () => {
    form.set("isCreatingSocialMedia")(true);
    await createSocialMedia({
      ...form.value,
      profileId: String(profileId),
    });
    form.reset();

    startTransition(() => {
      form.reset();
      router.refresh();
    });
  }, [form.value, profileId]);

  return {
    form,
    handleAddSocialMedia,
  };
}
