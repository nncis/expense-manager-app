import PeriodSelectorButton from "@/components/PeriodSelectorButton"

export default function monthWeekSelector(){
  return (
    <>
      <PeriodSelectorButton period="weekly" title="Weekly"/>
      <PeriodSelectorButton period="monthly" title="Monthly" />
    </>
  )
}