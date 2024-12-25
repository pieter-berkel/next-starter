import NextAuth, { DefaultSession } from "next-auth";
import bcrypt from "bcryptjs";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { database } from "@/db";
import { nanoid } from "@/utils/functions";
import { getUserByEmail } from "@/data/users";
import { Provider } from "next-auth/providers";
import { env } from "@/lib/env";

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
    credentials: {
      email: {},
      password: {},
    },
    async authorize(credentials) {
      if (typeof credentials.email !== "string" || typeof credentials.password !== "string") {
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

export const { handlers, signIn, signOut, auth } = NextAuth({
  trustHost: true,
  adapter: DrizzleAdapter(database),
  providers,
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
});
