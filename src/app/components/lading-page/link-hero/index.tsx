"use client";

import { useLandingPageHero } from "@/src/app/hooks/landing-page/hero";
import { sanitizeLink } from "@/src/app/lib/utilts";
import { Loader2 } from "lucide-react";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";

export function LinkHero() {
  const { form, handleCreateNewLink } = useLandingPageHero();

  return (
    <form
      onSubmit={handleCreateNewLink}
      className="flex items-center gap-2 w-full mt-[10vh]"
    >
      <span className="text-white text-xl">projectinbio.com/</span>

      <Input
        type="text"
        placeholder="Seu link"
        value={form.value.link}
        onChange={(v) => form.set("link")(sanitizeLink(v.target.value))}
      />

      <Button type="submit" disabled={!form.value.link || form.value.loading}>
        {form.value.loading ? (
          <Loader2 className="animate-spin" />
        ) : (
          "Criar Agora"
        )}
      </Button>
      {/* <CreateNow/> */}
    </form>
  );
}
