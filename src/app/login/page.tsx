'use client'

import { signIn } from 'next-auth/react';
import { useState } from 'react';
import style from '@/styles/login.module.css';
import { SiGoogle } from "react-icons/si";

export default function LoginPage() {

  const [emailInput, setEmailInput] = useState<string>('');
  
  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmailInput(e.target.value)
  }

  return (
    <main className={style.loginPage}>
      <h1 className={style.mainTitle}>Welcome</h1>
        <h4></h4>
        <input placeholder='Enter your email' className={style.loginInput} type='email' value={emailInput} onChange={inputHandler}></input>
        <button onClick={() => {
          signIn('email', {email: emailInput})
        }}
        className={style.submitBtn}
          >Log in</button>
          <p>Or</p>
        <button 
          onClick={() => signIn('google', { callbackUrl: "/dashboard" })}
          className={style.googleBtn}
          >
          
          <SiGoogle className={style.googleIcon} />
        </button>
    </main>
  );
}