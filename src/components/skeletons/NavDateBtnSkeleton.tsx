'use client'

import style from '@/styles/skeletonsComponents.module.css';
import { ChevronLeftIcon, ChevronRightIcon  } from '@heroicons/react/24/outline';

export default function NavDateBtnSkeleton(){
  
  return (
    <div className={style.periodNavButtons}>
      <button disabled>
        <ChevronLeftIcon className={style.arrowBtn}></ChevronLeftIcon>
      </button>
      <p>--:--</p>
      <button disabled>
        <ChevronRightIcon className={style.arrowBtn}></ChevronRightIcon>
      </button>
    </div>
  )
}