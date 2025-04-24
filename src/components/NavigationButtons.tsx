'use client'

import { useState, useEffect } from "react";
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import style from '@/styles/resume.module.css';
import { ChevronLeftIcon, ChevronRightIcon  } from '@heroicons/react/24/outline';

export default function PeriodNavigationButton(props: {period: string}){
  
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [firstAndLastExpenseDate, setFirstAndLastExpenseDate] = useState([]);

  useEffect(()=>{
    const sunday = getSunday(currentDate);
    setCurrentDate(sunday);
    handleFirstLastExpense();
  },[])

  useEffect(() => {
    //when press monthly or weekly button, it needs to make a first request.
    //so the url will update with the last sunday before the last expense or the first of day of the last expense month
    //for example: if the last expense date is "04-17" the url will be "&week=2025-04-13"(Sunday) or "&month=2025-04"
    const params = new URLSearchParams(searchParams.toString());
    if(props.period == "weekly"){
      const sunday = getSunday(currentDate);
      setCurrentDate(sunday);
      params.set('week', formatDate(sunday));
      router.push(`?${params.toString()}`);
    } else if(props.period == "monthly"){
      const firstOfMonth = getFirstDayOfMonth(currentDate);
      params.set('month', formatMonth(firstOfMonth));
      router.push(`?${params.toString()}`);
    }
  },[props.period])

  const firstExpense = new Date(firstAndLastExpenseDate[0]); 
  const lastExpense = new Date(firstAndLastExpenseDate[1]);

  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const handleFirstLastExpense =  async () => {
      try {
        const response = await fetch(`/api/resume/first-last-expense`);
        const data = await response.json();
        setFirstAndLastExpenseDate(data)
      } catch (error) {
        console.error('Error fetching first and last expenses dates:', error);
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
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() - 1);
    const firstOfMonth = getFirstDayOfMonth(newDate);
    if (firstOfMonth >= getFirstDayOfMonth(firstExpense)) {
      setCurrentDate(newDate);
    }
    const params = new URLSearchParams(searchParams.toString());
    params.set('month', formatMonth(newDate));
    router.replace(`?${params.toString()}`);
  };

  const nextMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + 1);
    const firstOfMonth = getFirstDayOfMonth(newDate);
    if (firstOfMonth <= getFirstDayOfMonth(lastExpense)) {
      setCurrentDate(newDate);
    };
    const params = new URLSearchParams(searchParams.toString());
    params.set('month', formatMonth(newDate));
    router.replace(`?${params.toString()}`);
  };

  //---------------------------------//

  //Week: Next and Last Week buttons
  const lastWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() - 7);
    const sunday = getSunday(newDate);
    if (sunday >= firstExpense) {
      setCurrentDate(newDate);
    };
    const params = new URLSearchParams(searchParams.toString());
    params.set('week', formatDate(newDate));
    router.replace(`?${params.toString()}`);
  };

  const nextWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + 7);
    const sunday = getSunday(newDate);
    if (sunday <= lastExpense) {
      setCurrentDate(newDate);
    };
    const params = new URLSearchParams(searchParams.toString());
    params.set('week', formatDate(newDate));
    router.replace(`?${params.toString()}`);
  };
  //---------------------------------//
  const firstOfMonth = getFirstDayOfMonth(currentDate);

  return (
    <>
      {
        props.period == "weekly" 
        ? 
        <div className={style.periodNavButtons}>
          <button onClick={lastWeek} disabled={getSunday(currentDate) <= getSunday(firstExpense)}>
            <ChevronLeftIcon className={style.arrowBtn}/>
          </button> 
          <p>{formatDate(currentDate)}</p>
          <button onClick={nextWeek} disabled={getSunday(currentDate) >= getSunday(lastExpense)}>
            <ChevronRightIcon className={style.arrowBtn}/>
          </button>
        </div>
        : 
        <div className={style.periodNavButtons}>
          <button onClick={lastMonth} disabled={firstOfMonth <= getFirstDayOfMonth(firstExpense)}>
          <ChevronLeftIcon className={style.arrowBtn}/>
          </button> 
          <p>{formatMonth(firstOfMonth)}</p>
          <button onClick={nextMonth} disabled={firstOfMonth >= getFirstDayOfMonth(lastExpense)}>
            <ChevronRightIcon className={style.arrowBtn}/>
          </button>
        </div>
      }
        
    </>
  )
}