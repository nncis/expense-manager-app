'use client'
import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

export default function PeriodSelectorButton(props: {period: string, title: string}){
  const router = useRouter()
  const searchParams = useSearchParams()

  const filter = () => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('period', props.period)
    router.push(`?${params.toString()}`)
  }

  return(
    <>
      <button onClick={filter}>{props.title}</button>
    </>
  )
}