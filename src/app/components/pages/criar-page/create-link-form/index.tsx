"use client";

import { useCreateLink } from "@/src/app/hooks/criar/index";
import { Button } from "../../../ui/button";
import { Input } from "../../../ui/input";

export function CreateLinkForm() {
  const { form, handleLinkChange, handleSubmit } = useCreateLink();

  return (
    <>
      <form onSubmit={handleSubmit} className="w-full flex  items-center gap-2">
        <span className="text-white">projectinbio.com/</span>
        <Input
          value={form.value.link}
          onChange={(v) => handleLinkChange(v.target.value)}
        />
        <Button className="w-[126px]">Criar link</Button>
      </form>

      <div>
        <span className="text-accent-pink">{form.value.error}</span>
      </div>
    </>
  );
}
