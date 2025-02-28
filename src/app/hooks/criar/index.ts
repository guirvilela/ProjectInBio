"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { createLink } from "../../actions/create-link";
import { verifyLink } from "../../actions/verifyLink";
import { sanitizeLink } from "../../lib/utilts";
import { useForm } from "../useForm";

export interface CreateLinkFormData {
  link: string;
  error: string;
}

export function useCreateLink() {
  const form = useForm<CreateLinkFormData>({
    link: "",
    error: "",
  });

  const router = useRouter();
  const searchParams = useSearchParams();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!form.value.link) return form.set("error")("Link é obrigatório");

    const isLinkTaken = await verifyLink(form.value.link);

    if (isLinkTaken) return form.set("error")("O link esolhido já existe");

    form.reset(["link"]);

    const isLinkCreated = await createLink(form.value.link);

    if (!isLinkCreated)
      return form.set("error")("Erro ao criar perfil. Tente novamnete");

    router.push(`/${form.value.link}`);
  }

  function handleLinkChange(link: string) {
    return form.set("link")(sanitizeLink(link));
  }

  React.useEffect(() => {
    if (searchParams.get("link")) {
      form.set("link")(sanitizeLink(String(searchParams.get("link"))));
    }
  }, [searchParams]);

  return {
    form,
    handleLinkChange,
    handleSubmit,
  };
}
