'use client'

import style from '@/styles/loading.module.css';

export default function NavDateBtnSkeleton(){
  
  return (
    <div className={`${style.navBtn} ${style.skeleton}`}></div>
  )
}