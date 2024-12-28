import { DrizzleAdapter } from "@auth/drizzle-adapter";
import bcrypt from "bcryptjs";
import NextAuth, { DefaultSession } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";

import { getUserByEmail, getUserById } from "@/data/users";
import { nanoid } from "@/utils/functions";
import { database, schema } from "@/db";
import { credentialsSchema } from "../validations/credentials-schema";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: DrizzleAdapter(database, {
    accountsTable: schema.accounts,
    usersTable: schema.users,
    sessionsTable: schema.sessions,
    verificationTokensTable: schema.verificationTokens,
  }),
  trustHost: true,
  pages: {
    signIn: "/sign-in",
    newUser: "/sign-up",
  },
  session: {
    strategy: "jwt",
    generateSessionToken: () => nanoid(),
  },
  callbacks: {
    signIn: async ({ user, account }) => {
      if (account?.type !== "credentials") return true;
      if (!user.id) return false;

      const existingUser = await getUserById(user.id);
      if (!existingUser || !existingUser.emailVerified) return false;

      return true;
    },
    session: async ({ session, token }) => ({
      ...session,
      user: {
        ...session.user,
        id: token.sub,
      },
    }),
  },
  providers: [
    Google({
      allowDangerousEmailAccountLinking: true,
    }),
    GitHub({
      allowDangerousEmailAccountLinking: true,
    }),
    Credentials({
      async authorize(credentials) {
        const validation = credentialsSchema.safeParse(credentials);

        if (!validation.success) return null;

        const { email, password } = validation.data;

        const user = await getUserByEmail(email);

        if (!user || !user.password) return null;

        const match = await bcrypt.compare(password, user.password);

        if (!match) return null;

        return user;
      },
    }),
  ],
});
