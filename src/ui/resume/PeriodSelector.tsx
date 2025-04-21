

import NavigationButtons from '@/components/NavigationButtons';
import PeriodSelectorButton from "@/components/PeriodSelectorButton"



export default async function PeriodSelectorButtons(props: {period: string}){


  return (
    <>
      {/* Select between "Weekly" or "Monthly" periods*/}
            <PeriodSelectorButton period="weekly" title="Weekly" />
            <PeriodSelectorButton period="monthly" title="Monthly" />

      {/* Navigate through weeks periods, starting by the last Sunday to the next Saturday or the last data in db */}
      {/* Navigate throguht months periods */}
      {props.period == "monthly" 
        ? <NavigationButtons period={props.period} /> 
        : <NavigationButtons period={props.period} />}
    
    </>
  )
}