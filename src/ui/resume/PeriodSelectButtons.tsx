'use client'

import PeriodSelectorButton from "@/components/PeriodSelectorButton"
import style from '@/styles/resume.module.css';

export default function PeriodSelectorButtons(){

  return (
      <div className={style.periodButtonsContainer}>
        {/* Select between "Weekly" or "Monthly" periods*/}
        <PeriodSelectorButton period="weekly" title="Weekly" />
        <PeriodSelectorButton period="monthly" title="Monthly" />
      </div>
  )
}