'use client'

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from 'next/navigation';
import style from '@/styles/resume.module.css';
import { ChevronLeftIcon, ChevronRightIcon  } from '@heroicons/react/24/outline';

export default function PeriodNavigationButton(props: {period: string | null, firstAndLastExpenseDates: Date[] | []}){

  const firstExpense = new Date(props.firstAndLastExpenseDates[0]); 
  const lastExpense = new Date(props.firstAndLastExpenseDates[1]);
  
  const [currentSunday, setCurrentSunday] = useState<Date>(lastExpense);
  const [firstOfMonth, setFirstOfMonth] = useState<Date>(lastExpense);
  
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());

  useEffect(() => {
    //when press monthly or weekly button, it needs to make a first request.
    //so the url will update with the last sunday before the last expense or the first of day of the last expense month
    //for example: if the last expense date is "04-17" the url will be "&week=2025-04-13"(Sunday) or "&month=2025-04"

    const sunday = getSunday(lastExpense);
    setCurrentSunday(sunday);
    console.log(sunday)


    if(props.period == "weekly"){
      params.set('week', formatDate(sunday));
      router.push(`?${params.toString()}`);
    } else if(props.period == "monthly"){
      const firstOfMonth = getFirstDayOfMonth(lastExpense);
      params.set('month', formatMonth(firstOfMonth));
      router.push(`?${params.toString()}`);
    }

  },[props.period])

  const getSunday = (date: Date) => {
  const localDate = new Date(date.getFullYear(), date.getMonth(), date.getDate()); // hora local, sin hora
  const day = localDate.getDay();
  localDate.setDate(localDate.getDate() - day);
  return localDate;
  };

  const formatDate = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1);
  };
  
  const formatMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // 0-indexed
    return `${year}-${month}`;
  };

  //Month: Next and Last Month buttons
  const lastMonth = () => {
    if(currentSunday){
      const newDate = currentSunday;
      newDate.setMonth(newDate.getMonth() - 1);
      const firstOfMonth = getFirstDayOfMonth(newDate);
      if (firstOfMonth <= getFirstDayOfMonth(lastExpense)) {
      setFirstOfMonth(newDate);
      };
      const params = new URLSearchParams(searchParams.toString());
      params.set('month', formatMonth(newDate));
      router.replace(`?${params.toString()}`);
    };
  };

  const nextMonth = () => {
    if(currentSunday){
      const newDate = currentSunday;
      newDate.setMonth(newDate.getMonth() + 1);
      const firstOfMonth = getFirstDayOfMonth(newDate);
      if (firstOfMonth <= getFirstDayOfMonth(lastExpense)) {
      setFirstOfMonth(newDate);
    };
      const params = new URLSearchParams(searchParams.toString());
      params.set('month', formatMonth(newDate));
      router.replace(`?${params.toString()}`);
    }
  };

  //---------------------------------//

  //Week: Next and Last Week buttons
  const lastWeek = () => {
    if(currentSunday){
    const newDate = currentSunday;
    newDate.setDate(newDate.getDate() - 7)
    setCurrentSunday(newDate);
    if(newDate >= firstExpense){
      setCurrentSunday(newDate)
    }
    
    const params = new URLSearchParams(searchParams.toString());
    params.set('week', formatDate(newDate));
    router.replace(`?${params.toString()}`);
    }

  };

  const nextWeek = () => {
    if(currentSunday){
      const newDate = currentSunday;
      newDate.setDate(newDate.getDate() + 7)
      setCurrentSunday(newDate);
      if(newDate >= firstExpense){
        setCurrentSunday(newDate)
      }
      
      const params = new URLSearchParams(searchParams.toString());
      params.set('week', formatDate(newDate));
      router.replace(`?${params.toString()}`);
    }
  };
  //---------------------------------//


  return (
    <>
      {
        props.period == "weekly" 
        ? 
        <div className={style.periodNavButtons}>
          <button onClick={lastWeek} disabled={getSunday(currentSunday) <= getSunday(firstExpense) || !lastExpense}>
            <ChevronLeftIcon className={style.arrowBtn}/>
          </button> 
          {

            <p>{formatDate(currentSunday)}</p>

          }
          <button onClick={nextWeek} disabled={getSunday(currentSunday) >= getSunday(lastExpense) || !lastExpense}>
            <ChevronRightIcon className={style.arrowBtn}/>
          </button>
        </div>
        : 
        <div className={style.periodNavButtons}>
          <button onClick={lastMonth} disabled={firstOfMonth <= getFirstDayOfMonth(firstExpense) || !lastExpense}>
          <ChevronLeftIcon className={style.arrowBtn}/>
          </button>
          {
            lastExpense ? 
            <p>{formatMonth(firstOfMonth)}</p> :
            <p>Not Data Yet</p>
          }
          <button onClick={nextMonth} disabled={firstOfMonth >= getFirstDayOfMonth(lastExpense) || !lastExpense}>
            <ChevronRightIcon className={style.arrowBtn}/>
          </button>
        </div>
      }
        
    </>
  )
}