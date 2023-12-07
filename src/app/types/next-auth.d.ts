import NextAuth, { DefaultSession } from "next-auth"

declare module "next-auth" {
  interface SendVerificationRequestParams {
    baseUrl?: string;
  }

  interface User {
    role?: string;
  }

  interface Session {
    user: {
      role: string | undefined | null;
    } & DefaultSession["user"];
  }
}
