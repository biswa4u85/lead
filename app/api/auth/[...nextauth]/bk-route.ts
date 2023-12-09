import NextAuth, { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import SiteApis from "../../../../contexts/SiteApis";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", placeholder: "Enter Email" },
                password: { label: "Password", placeholder: "Enter Password" }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) return null;
                let user: any = await SiteApis.login(credentials);
                if (!user?.error) {
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
    callbacks: {
        async session({ session, token }: any) {
            session.user.id = token.id;
            session.accessToken = token.accessToken;
            return session;
        },
        async jwt({ token, user }: any) {
            if (user) {
                token.id = user._id;
                token.role = user.userType;
                token.accessToken = user.accessToken;
            }
            return token;
        },
    },
    secret: process.env.NEXTAUTH_SECRET
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }