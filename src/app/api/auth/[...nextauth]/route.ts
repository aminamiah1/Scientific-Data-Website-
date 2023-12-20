import { db } from "@/app/utils/data";
import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth, { NextAuthOptions } from "next-auth";
import EmailProvider from "next-auth/providers/email";

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(db),
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
            return baseUrl;
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
    },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
