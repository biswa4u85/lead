import prisma from "@/app/libs/prisma";
import NextAuth, { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { PrismaAdapter } from "@next-auth/prisma-adapter";

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", placeholder: "Enter Email" },
                password: { label: "Password", placeholder: "Enter Password" }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) return null;
                let user: any = await prisma.user.findUnique({ where: { email: credentials?.email } });
                if (user) {
                    return user
                } else {
                    return null
                }
            }
        })
    ],
    pages: {
        signIn: "/auth",
    },
    debug: process.env.NODE_ENV === "development",
    session: { strategy: "jwt" },
    secret: process.env.NEXTAUTH_SECRET
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }