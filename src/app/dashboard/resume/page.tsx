'use client'

import style from '@/styles/resume.module.css';
import PeriodSelectorButtons from '@/ui/resume/PeriodSelectButtons';
import NavigationDates from '@/ui/resume/NavigationDates';
import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState, lazy } from 'react';
import PieGraphSkeleton from '@/components/skeletons/PieGraphSkeleton';
import BarGraphSkeleton from '@/components/skeletons/BarGraphSkeleton'; 

const BarGraph = lazy(() => import('@/components/barGraph'));
const PieGraph = lazy(() => import('@/components/pieGraph'));

export default function Resume(){

  const [ showGraph, setShowGraph ] = useState(false);

  const searchParams = useSearchParams();
  const router = useRouter();
  const period = searchParams.get("period") || "weekly";
  const params = new URLSearchParams(searchParams);

  useEffect(() => {
    params.set('period', 'weekly');
    router.push(`?${params.toString()}`);
  },[])

  return(
    <main className={style.dashboardMainPage}>
      <div className={style.title}>
        <h1>Resume</h1>
      </div>
      <div className={style.periodSelectorContainer}>
        {/* Select periods (monthly or weekly) buttons and navigates through dates  */}
          <PeriodSelectorButtons />
          <NavigationDates onRendered={() => setShowGraph(true)} period={period}/>
      </div>
      <div className={style.dashboardGraphs}>
        {showGraph ? <PieGraph/> : <PieGraphSkeleton />}
        {showGraph ? <BarGraph/> : <BarGraphSkeleton />}
      </div>
    </main>
  )
}