"use client"; // Marca este componente como cliente

import { signIn } from "next-auth/react";

export default function SignInGoogle() {
  return (
    <button
      onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
      type="button"
    >
      Sign in with Google
    </button>
  );
}