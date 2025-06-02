'use client'

import style from '@/styles/loading.module.css';

export default function TableSkeleton(){
  return(
    <div className={`${style.tableSkeleton} ${style.skeleton}`}>
    </div>
  )
}