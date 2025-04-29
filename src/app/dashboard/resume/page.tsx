import style from '@/styles/resume.module.css';
import PieGraph from '@/components/pieGraph';
import BarGraph from '@/components/barGraph';
import { getExpensesByWeek, getExpenseByMonth, getExpenseTotalAmountAnnualy, getExpenseTotalAmountWeekly, getFirstAndLastExpensesDates } from '@/lib/data';
import PeriodSelectorButtons from '@/ui/resume/PeriodSelector'; 

export default async function Resume({
  searchParams
}: {
  searchParams: Promise<{
    period?: string;
    week?: string;
    month?: string;
  }>
}){

    //Get the params of url
    const month = (await searchParams).month;
    const week = (await searchParams).week;
    
    // const year: any = month.split("-")[0];

    //data for pie graph
    const pieGraphDataWeekly = await getExpensesByWeek(week);
    const pieGraphdataMonthly = await getExpenseByMonth(month);

    //data for bar graph
    const barGraphDataWeekly = await getExpenseTotalAmountWeekly(week); 
    const barGraphDateAnnualy = await getExpenseTotalAmountAnnualy("2025");
    
    const periodTime = (await searchParams)?.period || "weekly";

    const firstAndLastExpenseDates = await getFirstAndLastExpensesDates();

    //Data for  Graph by years

  return(
    <main className={style.dashboardMainPage}>
      <div className={style.title}>
        <h1>Expenses</h1>
      </div>
      <div className={style.periodSelectorContainer}>
        {/* Select periods (monthly or weekly) buttons and navigates through dates  */}
          <PeriodSelectorButtons period={periodTime} firstAndLastExpenseDates={firstAndLastExpenseDates}/> 
      </div>
      <div className={style.dashboardGraphs}>
        
        <PieGraph data={week ? pieGraphDataWeekly : pieGraphdataMonthly} />
        <BarGraph data={week ? barGraphDataWeekly : barGraphDateAnnualy} period={periodTime}/>

        {/* <PieChart /> */}
        {/* <BarChart selectYears={selectYears} /> */}
        
      </div>
    </main>
  )
}