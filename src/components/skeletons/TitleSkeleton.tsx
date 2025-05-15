'use client'

import style from '@/styles/loading.module.css';

export default function TitleSkeleton(){
  
  return (
      <div className={`${style.title} ${style.skeleton}`}>
      </div>
  )
}