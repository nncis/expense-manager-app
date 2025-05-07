'use client'

import NavigationButtons from '@/components/NavigationButtons';
import { useState, useEffect } from 'react';
import NavDateBtnSkeleton from '@/components/skeletons/NavDateBtnSkeleton';

export default function NavigationDates(props: {period: string | null, onRendered: any}){

  const [ firstLastExpenses, setFirstLastExpenses ] = useState([]);
  const [ dataLoaded, setDataLoaded ] = useState(false);

  useEffect(() => {
    fetch('/api/first-last-expenses')
    .then(res => res.json())
      .then(data => {
        setFirstLastExpenses(data)
        setDataLoaded(true);
        props.onRendered();
      })
      .catch(error => {
        console.error('error fetch first and last expenses dates', error)
      })
  }, [])

  if(!dataLoaded){
    return <NavDateBtnSkeleton />
  }

  return (
    <>
      {/* Navigate through weeks periods, starting by the last Sunday to the next Saturday or the last data in db */}
       {props.period == "monthly" 
        ? <NavigationButtons period={props.period} firstAndLastExpenseDates={firstLastExpenses}/> 
        : <NavigationButtons period={props.period} firstAndLastExpenseDates={firstLastExpenses}/>
        }
    </>
  )
}