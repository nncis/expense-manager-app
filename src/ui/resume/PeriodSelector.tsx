

import NavigationButtons from '@/components/NavigationButtons';
import PeriodSelectorButton from "@/components/PeriodSelectorButton"
import style from '@/styles/resume.module.css';
import clsx from "clsx";


export default async function PeriodSelectorButtons(props: {period: string}){


  return (
    <>
      {/* Select between "Weekly" or "Monthly" periods*/}
      <div className={style.periodButtonsContainer}>
        <PeriodSelectorButton period="weekly" title="Weekly" />
        <PeriodSelectorButton period="monthly" title="Monthly" />
      </div>
            

      {/* Navigate through weeks periods, starting by the last Sunday to the next Saturday or the last data in db */}
      {/* Navigate throguht months periods */}
      {props.period == "monthly" 
        ? <NavigationButtons period={props.period} /> 
        : <NavigationButtons period={props.period} />
        }
    
    </>
  )
}