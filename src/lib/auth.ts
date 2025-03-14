import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import EmailProvider from 'next-auth/providers/email';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { NextAuthOptions } from "next-auth";
import { prisma } from "@/lib/prisma"; // Usa el singleton

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: 'jwt', // Usa JWT en lugar de sesiones en DB
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  cookies: {
    sessionToken: {
      name: process.env.NODE_ENV === 'production' 
        ? '__Secure-next-auth.session-token' 
        : 'next-auth.session-token',
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production',  // Debe ser `true` en producción
      },
    },
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      console.log('Usuario intentando iniciar sesión:', user);
      return true;
    },
    async redirect({ url, baseUrl }) {
      console.log('Redirigiendo a:', `${baseUrl}/dashboard`);
      return `${baseUrl}/dashboard`;
    },
    async session({ session, token }) {
      console.log('Sesión creada:', session);
      session.user.id = token.sub;
      return session;
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      console.log('Token JWT:', token);
      if (user) {
        token.id = user.id;
      }
      return token;
    },
  }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
