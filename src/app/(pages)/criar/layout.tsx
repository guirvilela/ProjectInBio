import { redirect } from "next/navigation";
import { auth } from "../../lib/auth";
import { getProfileId } from "../../server/get-profile-data";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  if (!session) redirect("/");

  const profileId = await getProfileId(session.user?.id!);

  if (profileId) redirect(`/${profileId}`);

  return <>{children}</>;
}
