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
                console.log('Attempting login with credentials:', credentials);
                const res = await fetch(`${process.env.API_BASE_URL}/api/login`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(credentials),
                });
                const data = await res.json();
                console.log('Response from backend:', res.status, data);
                if (res.ok && data.token) {
                    console.log('Login successful:', data.user);
                    return { token: data.token, user: data.user };
                }
                console.log('Login failed with:', res.status, data);
                return null;
            }
        }),
    ],
    pages: {
        signIn: '/', // Personaliza la página de inicio de sesión
    },
    callbacks: {

        async jwt({ token, user }) {
            console.log('JWT Callback - Incoming token:', token);
            if (user) {
                // Este callback se activa cada vez que se genera o actualiza un token JWT.
                token.accessToken = user.token;
                token.user = user.user;
                console.log('JWT Callback - Updated token:', token);
            }
            return token;
        },
        async session({ session, token }) {
            console.log('Session Callback - Token:', token);
            // Este callback se activa cada vez que se solicita la sesión, por ejemplo, cuando usamos el hook useSession() en los componentes del frontend.
            session.accessToken = token.accessToken;
            session.user = token.user;
            console.log('Session Callback - Updated session:', session);
            return session;
        },
    },
    // csrf: false, // Deshabilitar temporalmente
    debug: true, // Habilitar logs de depuración
    secret: process.env.NEXTAUTH_SECRET,
});


export { provider as GET, provider as POST };
