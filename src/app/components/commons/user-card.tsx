import {
  Facebook,
  Github,
  Instagram,
  Linkedin,
  Plus,
  Twitter,
  UserPen,
} from "lucide-react";
import Link from "next/link";
import React from "react";
import { ProfileData, SocialMedias } from "../../server/get-profile-data";
import { Button } from "../ui/button";

interface UserCardProps {
  onOpenAddSocialMedia: () => void;
  onOpenAddPersonalLink: () => void;
  onOpenEditUserCard: () => void;
  profileData?: ProfileData;
  socialMedias?: SocialMedias;
  isHome?: boolean;
  isOwner?: boolean;
  userPhoto?: string;
}

export function UserProfileCard({
  profileData,
  onOpenAddSocialMedia,
  onOpenAddPersonalLink,
  onOpenEditUserCard,
  isHome,
  isOwner,
  socialMedias,
  userPhoto,
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
    if (isHome || !socialMedias) return [];
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
          src={userPhoto}
          alt="Gui"
          className="rounded-full object-cover w-full h-full"
        />
      </div>

      <div className="flex flex-col gap-2 w-full">
        <div className="flex items-center gap-2">
          <h3 className="text-3xl font-bold min-w-0 overflow-hidden">
            {profileData?.name || "Seu nome"}
          </h3>
          {isOwner && (
            <Button variant="ghost" onClick={onOpenEditUserCard}>
              <UserPen />
            </Button>
          )}
        </div>
        <p className="opacity-40">
          {profileData?.description || "Um pouco sobre você"}
        </p>
      </div>

      <div className="flex flex-col gap-2 w-full">
        {socialMediasFormatted.length ? (
          <span className="uppercase text-xs font-medium">Links</span>
        ) : (
          <></>
        )}
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
      <div className="flex flex-col gap-3 w-full min-h-[172px]">
        <div className="w-full flex flex-col items-center gap-3">
          {profileData?.links.map((personalLink) => (
            <Link href={personalLink.link} target="_blank" className="w-full">
              <Button className="w-full">{personalLink.title}</Button>
            </Link>
          ))}
        </div>
        {isOwner && (
          <Button variant="secondary" onClick={onOpenAddPersonalLink}>
            <div className="flex gap-2 items-center justify-center">
              <Plus />
              <p className="text-white font-semibold">
                Adicionar link personalizado
              </p>
            </div>
          </Button>
        )}
      </div>
    </div>
  );
}
