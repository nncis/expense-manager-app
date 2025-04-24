'use client'

import { useRouter, useSearchParams } from 'next/navigation';
import style from '@/styles/resume.module.css';
import clsx from "clsx";
import { useEffect, useState } from 'react';

export default function PeriodSelectorButton(props: {period: string, title: string}){

  const router = useRouter()
  const searchParams = useSearchParams()
  const params = new URLSearchParams(searchParams.toString())
  const period = params.get('period');

  const filter = () => {
    params.delete('week');
    params.delete('month');
    params.set('period', props.period)
    router.replace(`?${params.toString()}`)
  }
  
  // useEffect(() => {
    


  // },[])

  return(
      <button 
        className={clsx(
          style.periodButton, {
            [style.periodButtonActive]: period == props.period
          }
        )}
        onClick={filter}
        >{props.title}
      </button>
  )
}