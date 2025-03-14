'use client'

import style from '@/styles/resume.module.css';
import { CalendarIcon } from '@heroicons/react/24/outline';
import BarGraph from '@/ui/resume/barGraph';
import { useState, useEffect } from 'react';

export default function AnnualChartExpense({
  selectYears
}: {
  selectYears: number[]
}) {
  const [year, setYear] = useState(selectYears[selectYears.length - 1].toString());
  const [data, setData] = useState([]);


  const handleFetchData = async  () => {
    if (!year) return;

    try {
      const response = await fetch(`/api/resume/barchart?year=${year}`);
      const data = await response.json();
      console.log(data)
      setData(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  
  useEffect(() => {
    handleFetchData()
  }, [year])

  return (
    <div className={style.expenseBarChart}>
        <BarGraph data={data}/>
      <div className={style.selectChart}>
        <CalendarIcon className={style.calendarIcon}/>
        <select 
          className={style.selectYear} 
          onChange={(e) => setYear(e.target.value)} 
          defaultValue={selectYears[selectYears.length - 1]}
          >
          {selectYears.map((year) => 
            <option key={year} value={year}>{year}</option>
          )}
        </select>
      </div>
    </div>
  )
}