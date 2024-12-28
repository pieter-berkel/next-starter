import { database, schema } from "@/db";
import { nanoid } from "@/utils/functions";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import NextAuth from "next-auth";

import { getUserByEmail } from "@/data/users";
import { env } from "@/lib/env";
import bcrypt from "bcryptjs";
import { DefaultSession } from "next-auth";
import { Provider } from "next-auth/providers";
import Credentials from "next-auth/providers/credentials";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}

const providers: Provider[] = [
  Google({
    allowDangerousEmailAccountLinking: true,
    clientId: env.AUTH_GOOGLE_ID,
    clientSecret: env.AUTH_GOOGLE_SECRET,
  }),
  GitHub({
    allowDangerousEmailAccountLinking: true,
    clientId: env.AUTH_GITHUB_ID,
    clientSecret: env.AUTH_GITHUB_SECRET,
  }),
  Credentials({
    async authorize(credentials) {
      if (
        typeof credentials.email !== "string" ||
        typeof credentials.password !== "string"
      ) {
        return null;
      }
      const user = await getUserByEmail(credentials.email);
      if (!user || !user.password) {
        return null;
      }
      const match = await bcrypt.compare(credentials.password, user.password);
      if (!match) {
        return null;
      }
      return user;
    },
  }),
];

export const providerMap = providers.map((provider) => {
  if (typeof provider === "function") {
    const providerData = provider();
    return {
      id: providerData.id,
      name: providerData.name,
    };
  } else {
    return { id: provider.id, name: provider.name };
  }
});

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
    session: async ({ session, token }) => ({
      ...session,
      user: {
        ...session.user,
        id: token.sub,
      },
    }),
  },
  providers,
});
