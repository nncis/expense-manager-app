'use client'

import style from '@/styles/resume.module.css';
import PeriodSelectorButtons from '@/ui/resume/PeriodSelectButtons';
import NavigationDates from '@/ui/resume/NavigationDates';
import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState, lazy } from 'react';
import PieGraphSkeleton from '@/components/skeletons/PieGraphSkeleton';
import BarGraphSkeleton from '@/components/skeletons/BarGraphSkeleton';
import TitleSkeleton from '@/components/skeletons/TitleSkeleton';
import NavDateBtnSkeleton from '@/components/skeletons/NavDateBtnSkeleton';
import PeriodSelectorSkeleton from '@/components/skeletons/PeriodSelectorSkeleton';

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
      {
      showGraph ? 
      <div className={style.title}><h1>Resume</h1></div> : 
      <TitleSkeleton/>}
      <div className={style.periodSelectorContainer}>
        {/* Select periods (monthly or weekly) buttons and navigates through dates  */}
        {showGraph ? <PeriodSelectorButtons /> : <PeriodSelectorSkeleton />}
          <NavigationDates onRendered={() => setShowGraph(true)} period={period}/>
      </div>
      <div className={style.graphsContainer}>
        {showGraph ? <PieGraph/> : <PieGraphSkeleton />}
        {showGraph ? <BarGraph/> : <BarGraphSkeleton />}
      </div>
    </main>
  )
}