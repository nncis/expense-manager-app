'use client'

import style from '@/styles/resume.module.css';
import PeriodSelectorButtons from '@/ui/resume/PeriodSelectButtons';
import NavigationDates from '@/ui/resume/NavigationDates';
import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState, lazy } from 'react';
import PieGraphSkeleton from '@/components/skeletons/PieGraphSkeleton';
import BarGraphSkeleton from '@/components/skeletons/BarGraphSkeleton';
import TitleSkeleton from '@/components/skeletons/TitleSkeleton';
import PeriodSelectorSkeleton from '@/components/skeletons/PeriodSelectorSkeleton';
import TotalAmountSkeleton from '@/components/skeletons/TotalAmountSkeleton';
import TotalAmount from '@/components/TotalAmount';

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
    <main className={style.resumeMainContainer}>
      <div className={style.titleContainer}>
       {showGraph ? <h1 className={style.title}>Resume</h1> : <TitleSkeleton/>} 
      </div>
      <div className={style.periodSelectorContainer}>
        {showGraph ? <PeriodSelectorButtons /> : <PeriodSelectorSkeleton />}
        <NavigationDates onRendered={() => setShowGraph(true)} period={period}/>
      </div>
      <div className={style.graphsContainer}>
        {showGraph ? <PieGraph/> : <PieGraphSkeleton />}
        {showGraph ? <BarGraph/> : <BarGraphSkeleton />}
        {showGraph ? <TotalAmount/> : <TotalAmountSkeleton />}
      </div>
    </main>
  )
}