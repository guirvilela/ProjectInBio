import {
  Facebook,
  Github,
  Instagram,
  Linkedin,
  Plus,
  Twitter,
} from "lucide-react";
import Link from "next/link";
import React from "react";
import { SocialMedias } from "../../server/get-profile-data";
import { Button } from "../ui/button";

interface UserCardProps {
  onOpenAddSocialMedia: () => void;
  socialMedias?: SocialMedias;
  isHome?: boolean;
  isOwner?: boolean;
}

export function UserProfileCard({
  onOpenAddSocialMedia,
  isHome,
  isOwner,
  socialMedias,
}: UserCardProps) {
  const icons = [Github, Instagram, Linkedin, Twitter, Facebook];

  const iconMap = {
    github: Github,
    instagram: Instagram,
    linkedin: Linkedin,
    twitter: Twitter,
    facebook: Facebook,
  };

  const socialMediasFormatted = React.useMemo(() => {
    if (isHome) return [];
    return (
      Object.entries(socialMedias as SocialMedias)
        .filter(([_, url]) => url)
        .map(([key, url]) => ({
          Icon: iconMap[key as keyof typeof iconMap],
          url,
        })) ?? []
    );
  }, [socialMedias]);

  return (
    <div className="w-[348px] flex flex-col gap-5 items-center p-5 border border-white border-opacity-10 bg-[#121212] rounded-3xl text-white">
      <div className="size-48">
        <img
          src="http://www.github.com/guirvilela.png"
          alt="Gui"
          className="rounded-full object-cover w-full h-full"
        />
      </div>

      <div className="flex flex-col gap-2 w-full">
        <div className="flex items-center gap-2">
          <h3 className="text-3xl font-bold min-w-0 overflow-hidden">
            Guilherme Dev
          </h3>
        </div>
        <p className="opacity-40">"Eu faço produtos para Internet"</p>
      </div>

      <div className="flex flex-col gap-2 w-full">
        <span className="uppercase text-xs font-medium">Links</span>
        <div className="flex gap-3">
          {isHome ? (
            icons.map((Icon, i) => (
              <button
                key={i}
                className="p-3 rounded-xl bg-[#1e1e1e] hover:bg-[#2e2e2e]"
              >
                <Icon />
              </button>
            ))
          ) : (
            <>
              {socialMediasFormatted.map(({ Icon, url }, i) => (
                <Link href={url} target="_blank" key={`${url}-${i}`}>
                  <button className="p-3 rounded-xl bg-[#1e1e1e] hover:bg-[#2e2e2e]">
                    <Icon />
                  </button>
                </Link>
              ))}
              {isOwner && (
                <button
                  className="p-3 rounded-xl bg-[#1e1e1e] hover:bg-[#2e2e2e]"
                  onClick={onOpenAddSocialMedia}
                >
                  <Plus />
                </button>
              )}
            </>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-3 w-full h-[172px]">
        <div className="w-full flex flex-col items-center gap-3">
          <Button className="w-full">Template Saas - Compre Agora</Button>

          <button className="p-3 rounded-xl bg-[#1e1e1e] hover:bg-[#2e2e2e]">
            <Plus />
          </button>
        </div>
      </div>
    </div>
  );
}
