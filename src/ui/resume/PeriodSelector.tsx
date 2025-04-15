
import MonthWeekSelector from '@/ui/resume/monthAndWeeklySelector';
import NavigationWeeklyButtons from '@/components/NavigationWeeklyButtons';

export default function PeriodSelectorButtons(){


  return (
    <>
      <MonthWeekSelector />
      
      <NavigationWeeklyButtons />
      {/* Weeks or Years Selectors depends of the URL period=week or period=monthly*/}
      {/* or <NavigationMonthlyButton />*/}
    </>
  )
}