import style from '@/styles/resume.module.css';
import PieChart from '@/ui/resume/PieChart';
import BarChart from '@/ui/resume/barChart';
import { getYears, getExpensesByWeek } from '@/lib/data';
import PeriodSelectorButtons from '@/ui/resume/PeriodSelector';

export default async function Resume({
  searchParams
}: {
  searchParams: Promise<{
    period?: string;
    week?: string;
  }>
}){

  //  //Data for pie Graph by month or week 
  // const view =  (await searchParams)?.view || "month";
    
    const week = (await searchParams).week
    const dateWeekly = await getExpensesByWeek(week);

    //Data for  Graph by years
    const yearsData = await getYears(); //get years from expenses to make the <select> options
    const selectYears = yearsData.map(year => year.year);

  return(
    <main className={style.dashboardMainPage}>
      <div className={style.title}>
        <h1>Expenses</h1>
      </div>
      <div className={style.periodSelectorContainer}>
        <PeriodSelectorButtons />
      </div>
      <div className={style.dashboardGraphs}>
        <PieChart />
        <BarChart selectYears={selectYears} />
      </div>
    </main>
  )
}