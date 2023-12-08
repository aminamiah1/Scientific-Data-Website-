import NextAuth, { NextAuthOptions } from "next-auth";
import EmailProvider from "next-auth/providers/email";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  providers: [
    EmailProvider({
      server: {
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT),
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASSWORD,
        },
      },
      from: process.env.SMTP_FROM,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      if (user.role !== "admin") {
        return false;
      }
      return true;
    },
    async redirect({ url, baseUrl }) {
      return baseUrl + "/admin/dashboard";
    },
    async jwt({ token, user }) {
      if (user && user.role === "admin") {
        token.role = "admin";
      }
      return token;
    },
    async session({ session, token }) {
      if (token.role === "admin") {
        session.user.role = "admin";
      }
      return session;
    },
  },
  pages: {
    signIn: "/admin/sign-in",
  },
  theme: {
    colorScheme: "light",
    logo: "/images/logo.png",
    //   brandColor: "#006700"
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
