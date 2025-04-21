import style from '@/styles/resume.module.css';
import PieChart from '@/ui/resume/PieChart';
import BarChart from '@/ui/resume/barChart';
import { getYears, getExpensesByWeek, expenseByMonth } from '@/lib/data';
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

    //Expenses of the last week
    const dateWeekly = await getExpensesByWeek(week);
    const dataMonthly = await expenseByMonth(month);
    console.log(dataMonthly)
    //
    const periodTime = (await searchParams)?.period || "weekly";

    //Data for  Graph by years
    const yearsData = await getYears(); //get years from expenses to make the <select> options
    const selectYears = yearsData.map(year => year.year);

  return(
    <main className={style.dashboardMainPage}>
      <div className={style.title}>
        <h1>Expenses</h1>
      </div>
      <div className={style.periodSelectorContainer}>
        {/* Select periods (monthly or weekly) buttons and navigates through dates  */}
        <PeriodSelectorButtons period={periodTime}/> 
      </div>
      <div className={style.dashboardGraphs}>
        <PieChart />
        <BarChart selectYears={selectYears} />
      </div>
    </main>
  )
}