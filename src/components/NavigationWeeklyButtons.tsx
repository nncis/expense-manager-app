'use client'

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from 'next/navigation';

export default function PeriodNavigationButton(){
  
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [firstAndLastExpenseDate, setFirstAndLastExpenseDate] = useState([]);

  // params.set('period', props.period)
  // router.push(`?${params.toString()}`)
  
  useEffect(()=>{
    const sunday = getSunday(currentDate);
    setCurrentDate(sunday);
    handleFirstLastExpense();

    const params = new URLSearchParams(searchParams.toString());
    params.set('period', 'weekly')
    router.push(`?${params.toString()}`)

    params.set('week', formatDate(sunday));
    router.push(`?${params.toString()}`);

  },[])

  const firstExpense = new Date(firstAndLastExpenseDate[0]); 
  const lastExpense = new Date(firstAndLastExpenseDate[1]);

  const router = useRouter()
  const searchParams = useSearchParams()
  
  const handleFirstLastExpense =  async () => {
    try {
      const response = await fetch(`/api/resume/first-last-expense`);
      const data = await response.json();
      setFirstAndLastExpenseDate(data)
    } catch (error){
      console.error('Error fetching data:', error);
    }
  };

  const getSunday = (date: Date) => {
    const d = new Date(date);
    const day = d.getDay();
    d.setDate(d.getDate() - day);
    return d;
  };

  const formatDate = (date: Date) => {
    return date.toISOString().split('T')[0];
  };
  

  //left
  const lastWeek = () => {
    
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() - 7);

    const sunday = getSunday(newDate);

    if (sunday >= firstExpense) {
      setCurrentDate(newDate);
    }

    const params = new URLSearchParams(searchParams.toString());
    params.set('week', formatDate(newDate));
    router.push(`?${params.toString()}`);
  }

  //right
  const nextWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + 7);
    const sunday = getSunday(newDate);

    if (sunday <= lastExpense) {
      setCurrentDate(newDate);
    }



    const params = new URLSearchParams(searchParams.toString());
    params.set('week', formatDate(newDate));
    router.push(`?${params.toString()}`);
  }

  return (
    <div>
        <button onClick={lastWeek} disabled={getSunday(currentDate) <= getSunday(firstExpense)}>⬅️</button> 
        <p>{formatDate(currentDate)}</p>
        <button onClick={nextWeek} disabled={getSunday(currentDate) >= getSunday(lastExpense)}>➡️</button>
    </div>
  )
}