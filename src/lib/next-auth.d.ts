import "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id?: string; // `id` es opcional
      name?: string;
      email?: string;
      image?: string;
    };
  }

  interface User {
    id?: string; // `id` es opcional
    name?: string;
    email?: string;
    image?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string; // `id` es opcional
  }
}