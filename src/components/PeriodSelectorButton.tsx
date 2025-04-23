'use client'

import { useRouter, useSearchParams } from 'next/navigation';
import style from '@/styles/resume.module.css';
import clsx from "clsx";

export default function PeriodSelectorButton(props: {period: string, title: string}){

  const router = useRouter()
  const searchParams = useSearchParams()

  const filter = () => {
    const params = new URLSearchParams(searchParams.toString())
    params.delete('week');
    params.delete('month');
    params.set('period', props.period)
    router.replace(`?${params.toString()}`)
  }

  return(
    <>
      <button 
        className={clsx(style.periodButton)}
        onClick={filter}
        >{props.title}</button>
    </>
  )
}