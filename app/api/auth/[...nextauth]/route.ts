import NextAuth, { AuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        email: credentials?.email,
                        password: credentials?.password,
                    }),
                });

                const data = await res.json();

                if (!res.ok || !data.user || !data.token) return null;

                // Return user with Sanctum token
                return {
                    id: data.user.id,
                    name: data.user.name,
                    email: data.user.email,
                    user_type: data.user.user_type,
                    token: data.token,
                    profile_picture: data.user.profile_picture || null,
                } as User;
            },
        }),


    ],

    session: { strategy: "jwt" },



    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.user = user; // store user object in token
                token.accessToken = user.token; // store token separately
            }
            return token;
        },

        async session({ session, token }) {
            session.user = token.user as User;
            session.accessToken = token.accessToken; // attach token directly
            return session;
        },
    },


    pages: {
        signIn: "/admin", signOut: "/login",
    },

    events: {
        async signOut({ token }) {
            try {
                // Call your Laravel logout API
                await fetch(`${process.env.NEXT_PUBLIC_API_URL}/logout`, {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${(token.user as any)?.token}`,
                        "Content-Type": "application/json",
                    },
                });
            } catch (error) {
                console.error("Logout API failed:", error);
            }
        },
    },



};

const handler = NextAuth({
    ...authOptions,
    secret: process.env.NEXTAUTH_SECRET,
});
export { handler as GET, handler as POST };
