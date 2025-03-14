'use client'

import style from '@/styles/resume.module.css';

import { CalendarIcon } from '@heroicons/react/24/outline';
import { useState, useEffect } from 'react';
import PieGraph from '@/ui/resume/PieGraph';

export default function PieChart(){
  const [pieDate, setPieDate] = useState('month');
  const [data, setData] = useState([]);

  const handleFetchData = async () => {
    if (!pieDate) return;

    try {
      const response = await fetch(`/api/resume/piechart?date=${pieDate}`);
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    handleFetchData()
  }, [pieDate])
  
  return(
    <div className={style.expensePieChart}>
      <PieGraph data={data}/>
      <div className={style.selectChart}>
        <CalendarIcon className={style.calendarIcon}/>
        <select 
          className={style.selectWeekMonth} 
          onChange={(e) => setPieDate(e.target.value)} 
          defaultValue={pieDate}>
          <option value="month">Last month</option>
          <option value="week">Last week</option>
        </select>
      </div>
    </div>
  )
}