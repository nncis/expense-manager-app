'use client'

import style from '@/styles/resume.module.css';
import PeriodSelectorButtons from '@/ui/resume/PeriodSelectButtons';
import NavigationDates from '@/ui/resume/NavigationDates';
// import BarGraph from '../../../components/barGraph'
// import PieGraph from '@/components/pieGraph';
import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState, Suspense, lazy } from 'react';

const BarGraph = lazy(() => import('@/components/barGraph'));
const PieGraph = lazy(() => import('@/components/pieGraph'));

export default function Resume(){

  const [ showGraph, setShowGraph ] = useState(false);

  const searchParams = useSearchParams();
  const router = useRouter();
  const period = searchParams.get("period") || "weekly";



  useEffect(() => {
    const params = new URLSearchParams(searchParams);
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
        <Suspense fallback={<p>Loading...</p>}>
          <PieGraph></PieGraph>
        </Suspense>
        <Suspense fallback={<p>Loading...</p>}>
          <BarGraph></BarGraph>
        </Suspense>

        {/* {showGraph ? <PieGraph/> : <p>Loading</p>} */}
        {/* {showGraph ? <BarGraph period={period}/> : <p>Loading</p>} */}
        {/* need skeleton */}
      </div>
    </main>
  )
}