"use client";

import { useEditUser } from "@/src/app/hooks/edit-user";
import { PersonalLinks, usePersonalLink } from "@/src/app/hooks/personal-link";
import { useSocialMedia } from "@/src/app/hooks/social-media";
import { ProfileData, SocialMedias } from "@/src/app/server/get-profile-data";
import React from "react";
import { UserProfileCard } from "../../../commons/user-card";
import { ModalAddPersonalLink } from "../modal-add-personal-link";
import { ModalAddSocialMedia } from "../modal-add-social-media";
import { ModalEditUserCard } from "../modal-edit-user-card";

interface UserCardProps {
  socialMedias?: SocialMedias;
  profileData?: ProfileData;
  personalLinks?: PersonalLinks[];
  isHome?: boolean;
  isOwner?: boolean;
  userPhoto?: string;
}

export function UserCard({
  profileData,
  socialMedias,
  personalLinks,
  isHome,
  isOwner,
  userPhoto,
}: UserCardProps) {
  const { form, handleAddSocialMedia } = useSocialMedia();

  const {
    formPersonalLink,
    handleAddLink,
    handleRemoveLink,
    handleSaveCustomLink,
  } = usePersonalLink();

  const {
    formEditUser,
    handleSetProfilePhotoInput,
    editUserAction,
    handleSaveEditUser,
  } = useEditUser();

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

  React.useEffect(() => {
    if (personalLinks?.length) {
      formPersonalLink.set("links")(personalLinks);
    } else {
      formPersonalLink.reset();
    }
  }, [personalLinks]);

  React.useEffect(() => {
    if (profileData?.name) {
      formEditUser.set("name")(profileData.name);
    }
    if (profileData?.description) {
      formEditUser.set("description")(profileData.description);
    }
  }, [profileData]);

  return (
    <>
      <UserProfileCard
        profileData={profileData}
        onOpenAddSocialMedia={() => form.set("modalSocialMedia")(true)}
        onOpenAddPersonalLink={() =>
          formPersonalLink.set("modalPersonalLink")(true)
        }
        onOpenEditUserCard={() => formEditUser.set("openModalEditUser")(true)}
        socialMedias={socialMedias}
        isHome={isHome}
        isOwner={isOwner}
        userPhoto={userPhoto}
      />

      <ModalEditUserCard
        onSaveEditUser={handleSaveEditUser}
        editUserAction={editUserAction}
        formEditUser={formEditUser}
        onSetProfilePhoto={handleSetProfilePhotoInput}
      />

      <ModalAddSocialMedia
        form={form}
        onAddSocialMedia={handleAddSocialMedia}
      />

      <ModalAddPersonalLink
        form={formPersonalLink}
        onSavePersonalLink={handleSaveCustomLink}
        onAddPersonalLink={handleAddLink}
        onRemovePersonalLink={handleRemoveLink}
      />
    </>
  );
}
