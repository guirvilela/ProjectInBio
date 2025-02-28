import { signIn } from "next-auth/react";
import React, { FormEvent } from "react";
import { useForm } from "../../useForm";

interface HeroForm {
  link: string;
  loading: boolean;
}
export function useLandingPageHero() {
  const form = useForm<HeroForm>({
    link: "",
    loading: false,
  });

  const handleCreateNewLink = React.useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      form.set("loading")(true);

      signIn("google", {
        redirectTo: `/criar?link=${form.value.link}`,
      });
    },
    [form.value]
  );

  return {
    form,
    handleCreateNewLink,
  };
}
