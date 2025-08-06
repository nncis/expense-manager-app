'use client'

import style from '@/styles/nav.module.css';
import NavLinks from '@/components/Nav-Links';
import { signOut } from "next-auth/react";
import { PowerIcon,  } from '@heroicons/react/24/outline';

export default function SideNav() {
  return (
    <div className={style.nav}>
      <nav className={style.sidenav}>
        <NavLinks />
      </nav>
      <div
        className={style.signOutContainer}
      >
        <button 
          className={style.signOut}
          onClick={()=> signOut({callbackUrl: '/'})}
          type='button'
          >
          <PowerIcon className={style.logOutIcon}/>
        </button>
      </div>
    </div>
  )
} 