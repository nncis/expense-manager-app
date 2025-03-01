import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import DatabaseHandler from '@/lib/databaseHandler';

const dbHandler = new DatabaseHandler();

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn(user) {
      try {
        // Verificar si el usuario ya existe en la base de datos
        const existingUser = await dbHandler.getUserByEmail(user.user.email);
        if (!existingUser) {
          const userId: string = await dbHandler.createUser(user.user.email, user.user.name);
          // Actualizar la última vez que el usuario inició sesión
          user.user.id = userId;
        }
        return true; // Permitir el inicio de sesión
      } catch (error) {
        console.error("Error en el callback signIn:", error);
        return false; // Evitar el inicio de sesión en caso de error
      }
    },
    async jwt({ token, user }) {
      if(user){
        token.id = user.id as string;
      }
      return token;
    },
    async session({ session, token }) {
      if (token.id) {
        session.user.id = token.id;
      }
      return session;
    },
  },
});

export { handler as GET, handler as POST };