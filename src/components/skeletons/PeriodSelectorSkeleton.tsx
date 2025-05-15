'use client'

import style from '@/styles/loading.module.css';

export default function PeriodSelectorSkeleton(){
  
  return (
        <div className={`${style.periodSelectorButtons}`}>
          <div className={`${style.periodBtn} ${style.skeleton}`}></div>
          <div className={`${style.periodBtn} ${style.skeleton}`}></div>
        </div>
  )
}