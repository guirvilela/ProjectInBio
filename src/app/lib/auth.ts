import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { db } from "./firebase";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID as string,
      clientSecret: process.env.AUTH_GOOGLE_SECRET as string,
    }),
  ],

  callbacks: {
    async jwt({ token, account }) {
      if (account && account.provider === "google") {
        const userId = account.providerAccountId;
        const userDocRef = db.collection("users").doc(userId);

        try {
          const userDoc = await userDocRef.get();

          if (!userDoc.exists) {
            await userDocRef.set({
              id: userId,
              email: token.email!,
              name: token.name!,
              image: token.picture!,
              createdAt: new Date().toISOString(),
            });
          }

          token.uid = userId;
        } catch (error) {
          console.error("Erro ao acessar o Firestore:", error);
          throw new Error("Erro ao criar ou acessar o usuário no Firestore.");
        }
      }

      return token;
    },

    async session({ session, token }) {
      session.user.id = token.uid as string;
      return session;
    },
  },
});
