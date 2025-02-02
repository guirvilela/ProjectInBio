"use server";

import { auth, signIn, signOut } from "../lib/auth";

export async function manageAuth() {
  const session = await auth();

  if (!session) {
    await signIn("google", {
      redirectTo: "/criar",
    });
  }

  return signOut({
    redirectTo: "/",
  });
}
