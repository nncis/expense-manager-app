'use client'

import style from '@/styles/resume.module.css';
import PieGraph from '@/components/pieGraph';
import BarGraph from '@/components/barGraph';
import { getExpensesByWeek, getExpenseByMonth, getExpenseTotalAmountAnnualy, getExpenseTotalAmountWeekly, getFirstAndLastExpensesDates } from '@/lib/data'; 
import PeriodSelectorButtons from '@/ui/resume/PeriodSelectButtons';
import NavigationDates from '@/ui/resume/NavigationDates';
import TestGraph from '@/components/tesGraph';
import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ExpenseByDate, ExpenseAmountByDate } from '@/lib/definitions';

export default function Resume(
//   {
//   searchParams
// }: {
//   searchParams: Promise<{
//     period?: string;
//     week?: string;
//     month?: string;
//   }>
// }
){
  const [dataExpense, setDataExpense] = useState<ExpenseByDate>({category: "", amount: 0, date: new Date()});
  const [ showGraph, setShowGraph ] = useState(false);

  const searchParams = useSearchParams();
  const router = useRouter();

  const period = searchParams.get("period") || "weekly";
  const month = searchParams.get("month");
  const week = searchParams.get("week");

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    params.set('period', 'weekly');
    router.push(`?${params.toString()}`);
  },[])
  
    //Get the params of url
    // const month = (await searchParams).month;
    // const week = (await searchParams).week;

    // const year: any = month.split("-")[0];
    // const periodTime = (await searchParams).period || "weekly";

    // //data for pie graph
    // const pieGraphDataWeekly = await getExpensesByWeek(week);
    // const pieGraphdataMonthly = await getExpenseByMonth(month);

    // //data for bar graph
    // const barGraphDataWeekly = await getExpenseTotalAmountWeekly(week); 
    // const barGraphDateAnnualy = await getExpenseTotalAmountAnnualy("2025");
    

    // const firstAndLastExpenseDates = await getFirstAndLastExpensesDates();

    //Data for  Graph by years

  return(
    <main className={style.dashboardMainPage}>
      <div className={style.title}>
        <h1>Expenses</h1>
      </div>
      <div className={style.periodSelectorContainer}>
        {/* Select periods (monthly or weekly) buttons and navigates through dates  */}
          <PeriodSelectorButtons />
          {/* <NavigationDates period={periodTime} firstAndLastExpenseDates={firstAndLastExpenseDates}/> */}

          <NavigationDates onRendered={() => setShowGraph(true)} period={period}/>
      </div>
      <div className={style.dashboardGraphs}>
        
        {/* <PieGraph data={week ? pieGraphDataWeekly : pieGraphdataMonthly} />
        <BarGraph data={week ? barGraphDataWeekly : barGraphDateAnnualy} period={periodTime}/> */}

        {/* <PieChart /> */}
        {/* <BarChart selectYears={selectYears} /> */}

        {showGraph ? <TestGraph/> : <p>Loading</p> }
        {/* need skeleton */}
      </div>
    </main>
  )
}