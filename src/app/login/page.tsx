'use client'
import { signIn } from 'next-auth/react';

export default function LoginPage() {
  
  return (
    <div>
      <h1>Iniciar Sesión</h1>
      <button onClick={() => signIn('google', { redirectTo: "dashboard" })}>Iniciar sesión con Google</button>
      <button onClick={() => signIn('email')}>Iniciar sesión con Magic Link</button>
    </div>
  );
}