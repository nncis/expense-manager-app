'use client'
import { signIn } from 'next-auth/react';
import { useState } from 'react';

export default function LoginPage() {

  const [emailInput, setEmailInput] = useState<string>('');
  
  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmailInput(e.target.value)
  }

  return (
    <>
      <h1>Iniciar Sesión</h1>
      <button onClick={() => signIn('google', { callbackUrl: "/dashboard" })}>Iniciar sesión con Google</button>
      <p>
        {emailInput}
      </p>
      <input type='email' value={emailInput} onChange={inputHandler}></input>
      <button onClick={() => {
        signIn('email', {email: emailInput})
      }}
        >Iniciar sesión con Magic Link</button>
    </>
  );
}