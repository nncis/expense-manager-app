'use client'

import { useState } from "react";
import style from '@/styles/menuSettings.module.css';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
import { useSession } from "next-auth/react"
import LogoutButton from "@/components/LogoutButton";


export default function MenuSettings(){
  const [isOpen, setIsOpen] = useState(false);
  const { data: session, status } = useSession();
  const profilePicture = session?.user.image || "https://static.vecteezy.com/system/resources/previews/020/765/399/non_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg"
  console.log(session?.user.image)

  if (status === "loading") return <p>Cargando sesión...</p>

  const toggleDropdown = () => setIsOpen(!isOpen);

  return (
    <>
      <div className={style.menuSettingsContainer}>
        <img
          className={style.profileImg}
          src={profilePicture}
          alt="profile image"
        ></img>
        <button
          className={style.expandBtn}
          onClick={toggleDropdown}
        >
          {isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
        </button>
      </div>
        {isOpen && (
          <div className={style.menuOptionsContainer}>
            <LogoutButton />
          </div>
        )}
    </>



  )
}