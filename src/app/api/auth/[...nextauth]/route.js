import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const provider = NextAuth({
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'text' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials) {
                const res = await fetch(`${process.env.API_BASE_URL}/api/login`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(credentials),
                });

                const data = await res.json();
                if (res.ok && data.token) {
                    return { token: data.token, user: data.user };
                }
                return null;
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                // Este callback se activa cada vez que se genera o actualiza un token JWT.
                token.accessToken = user.token;
                token.user = user.user;
            }
            return token;
        },
        async session({ session, token }) {
            // Este callback se activa cada vez que se solicita la sesión, por ejemplo, cuando usamos el hook useSession() en los componentes del frontend.
            session.accessToken = token.accessToken;
            session.user = token.user;
            return session;
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
});

// const handler = NextAuth({
//     providers: [
//       GoogleProvider({
//         clientId: process.env.GOOGLE_CLIENT_ID as string,
//         clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
//       }),
//     ],
//   });

export { provider as GET, provider as POST };
