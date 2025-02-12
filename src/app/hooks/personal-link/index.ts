import { useParams, useRouter } from "next/navigation";
import React, { startTransition } from "react";
import { addCustomLinks } from "../../actions/add-custom-link";
import { useForm } from "../useForm";

export interface PersonalLinks {
  title: string;
  link: string;
}
export interface PersonalLinkForm {
  modalPersonalLink: boolean;
  loading: boolean;
  links: PersonalLinks[];
}
export function usePersonalLink() {
  const router = useRouter();
  const { profileId } = useParams();
  const formPersonalLink = useForm<PersonalLinkForm>({
    modalPersonalLink: false,
    loading: false,
    links: [{ title: "", link: "" }],
  });

  const handleAddLink = React.useCallback(() => {
    formPersonalLink.setAll({
      links: [...formPersonalLink.value.links, { title: "", link: "" }],
    });
  }, [formPersonalLink.value.links]);

  const handleRemoveLink = React.useCallback(
    (indexLink: number) => {
      const newLinks = formPersonalLink.value.links.filter(
        (_, index) => index !== indexLink
      );

      formPersonalLink.set("links")(newLinks);
    },
    [formPersonalLink.value]
  );

  const handleSaveCustomLink = React.useCallback(async () => {
    formPersonalLink.set("loading")(true);
    if (!profileId) return;

    await addCustomLinks({
      links: formPersonalLink.value.links,
      profileId: String(profileId),
    });

    startTransition(() => {
      formPersonalLink.reset(["links"]);
      router.refresh();
    });
  }, [formPersonalLink.value]);

  return {
    formPersonalLink,
    handleAddLink,
    handleRemoveLink,
    handleSaveCustomLink,
  };
}
