
import { signOut } from "next-auth/react";
import { PowerIcon, } from '@heroicons/react/24/outline';
import style from '@/styles/menuSettings.module.css';


export default function LogoutButton() {
  return (
    <>
      <button
        onClick={() => signOut({ callbackUrl: '/' })}
        type='button'
        className={style.logoutBtn}
      >
        <PowerIcon className={style.logoutBtn} />
      </button>
      <p>Logout</p>
    </>
  )
} 
