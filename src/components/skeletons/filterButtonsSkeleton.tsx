'use client'

import style from '@/styles/loading.module.css';

export default function FilterButtonsSkeleton(){
  return(
    < >
      <div className={`${style.filterButton} ${style.skeleton}`}></div>
      <div className={`${style.filterButton} ${style.skeleton}`}></div>
    </>
  )
}