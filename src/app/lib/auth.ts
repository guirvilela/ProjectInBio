import { Timestamp } from "firebase-admin/firestore";
import NextAuth, { DefaultSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { TRIAL_DAYS } from "./config";
import { db } from "./firebase";

declare module "next-auth" {
  interface Session {
    user: {
      createdAt: number;
      isTrial: boolean;
      isSubscribed: boolean;
    } & DefaultSession["user"];
  }
  interface User {
    createdAt: number;
    isTrial?: boolean;
    isSubscribed: boolean;
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID as string,
      clientSecret: process.env.AUTH_GOOGLE_SECRET as string,
    }),
  ],
  events: {
    createUser: async ({ user }) => {
      if (!user.id) return;

      await db.collection("users").doc(user.id).set(
        {
          createdAt: Timestamp.now().toMillis(),
        },
        { merge: true }
      );
    },
  },

  callbacks: {
    async jwt({ token, account }) {
      if (account && account.provider === "google") {
        const userId = account.providerAccountId;
        const userDocRef = db.collection("users").doc(userId);

        try {
          const userDoc = await userDocRef.get();
          let createdAt = Timestamp.now().toMillis();
          // let isSubscribed = false;

          if (userDoc.exists) {
            const data = userDoc.data();
            if (data?.createdAt instanceof Timestamp) {
              createdAt = data.createdAt.toMillis();
            } else if (typeof data?.createdAt === "number") {
              createdAt = data.createdAt;
            } else {
              await userDocRef.set({ createdAt }, { merge: true });
            }
          } else {
            await userDocRef.set({
              id: userId,
              email: token.email!,
              name: token.name!,
              image: token.picture!,
              createdAt,
            });
          }

          token.uid = userId;
          token.createdAt = createdAt;
        } catch (error) {
          console.error("Erro ao acessar o Firestore:", error);
          throw new Error("Erro ao criar ou acessar o usuário no Firestore.");
        }
      }
      return token;
    },

    async session({ session, token }) {
      if (!token.uid) {
        console.error("Token UID is missing.");
        return session;
      }
      const user = await db
        .collection("users")
        .doc(token.uid as string)
        .get();

      const createdAtTimestamp = Number(token.createdAt) || 0;
      const trialLimit = Date.now() - 1000 * 60 * 60 * 24 * TRIAL_DAYS;

      return {
        ...session,
        user: {
          ...session.user,
          id: token.uid as string,
          name: token.name,
          email: token.email,
          image: token.picture,
          createdAt: createdAtTimestamp,
          isTrial: createdAtTimestamp > trialLimit,
          isSubscribed: user.data()?.isSubscribed,
        },
      };
    },
  },
});
