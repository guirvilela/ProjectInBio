import { Metadata } from "next";

interface UseGenerateMetaDataProps {
  title: string;
  description: string;
  projectName: string;
}

export function useGenerateMetaData({
  title,
  description,
  projectName,
}: UseGenerateMetaDataProps): Metadata {
  return {
    title: `${projectName} | ${title}`,
    description,
  };
}
