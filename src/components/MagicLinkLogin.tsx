'use client'

import { signIn } from 'next-auth/react';
import { FormEvent } from 'react'; 

export default function SignInMagicLink() {
  const handleMagicLink = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const email = event.currentTarget.email.value;
    await signIn('email', { email, redirect: false });
    alert('Revisa tu correo electrónico para el enlace mágico.');
  };

  return (
    <div>
      <h1>Iniciar Sesión</h1>

      {/* Opción de Magic Link */}
      <form onSubmit={handleMagicLink}>
        <input type="email" name="email" placeholder="Correo electrónico" required />
        <button type="submit">Enviar enlace mágico</button>
      </form>
    </div>
  );
}