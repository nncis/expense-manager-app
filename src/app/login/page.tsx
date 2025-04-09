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
      <h1 className={style.mainTitle}>Welcome to Expense Manager</h1>

      {/* google button */}
        <button 
          onClick={() => signIn('google', { callbackUrl: "/dashboard" })}
          className={style.googleBtn}
          >
          <SiGoogle className={style.googleIcon} />
          Continue with Google
        </button>
      {/* ------------   */}
        <div className={style.divisor}>
        <div className={style.divisorLine}></div>
        <p>OR</p>
        <div className={style.divisorLine}></div>
        </div>
      {/* email button */}
        <input placeholder='Email' className={style.loginInput} type='email' value={emailInput} onChange={inputHandler}></input>
        <button onClick={() => {
          signIn('email', {email: emailInput})
          }}
          className={style.submitBtn}
          >
          Continue with Email
        </button>
      {/* ---------- */}
    </main>
  );
}