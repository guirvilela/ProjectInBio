"use client";

import { usePersonalLink } from "@/src/app/hooks/personal-link";
import { useSocialMedia } from "@/src/app/hooks/social-media";
import { SocialMedias } from "@/src/app/server/get-profile-data";
import React from "react";
import { UserProfileCard } from "../../../commons/user-card";
import { ModalAddPersonalLink } from "../modal-add-personal-link";
import { ModalAddSocialMedia } from "../modal-add-social-media";

interface UserCardProps {
  socialMedias?: SocialMedias;
  isHome?: boolean;
  isOwner?: boolean;
}
export function UserCard({ socialMedias, isHome, isOwner }: UserCardProps) {
  const { form, handleAddSocialMedia } = useSocialMedia();

  const { formPersonalLink } = usePersonalLink();

  React.useEffect(() => {
    if (socialMedias) {
      form.setAll({
        facebook: socialMedias.facebook,
        github: socialMedias.github,
        linkedin: socialMedias.linkedin,
        twitter: socialMedias.twitter,
        instagram: socialMedias.instagram,
      });
    }
  }, [socialMedias]);

  return (
    <>
      <UserProfileCard
        onOpenAddSocialMedia={() => form.set("modalSocialMedia")(true)}
        socialMedias={socialMedias}
        isHome={isHome}
        isOwner={isOwner}
      />

      <ModalAddSocialMedia
        form={form}
        onAddSocialMedia={handleAddSocialMedia}
      />

      <ModalAddPersonalLink form={formPersonalLink} />
    </>
  );
}
