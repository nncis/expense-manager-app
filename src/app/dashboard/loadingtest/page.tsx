import style from '@/styles/loading.module.css';
import BarGraphSkeleton from '@/components/skeletons/BarGraphSkeleton';
import PieGraphSkeleton from '@/components/skeletons/PieGraphSkeleton';
import TotalAmountSkeleton from '@/components/skeletons/TotalAmountSkeleton';
import NavDateBtnSkeleton from '@/components/skeletons/NavDateBtnSkeleton';
import TitleSkeleton from '@/components/skeletons/TitleSkeleton';
import PeriodSelectorSkeleton from '@/components/skeletons/PeriodSelectorSkeleton';

export default function Loading(){
  return(
    <div className={style.resumeMainContainer}>
      <TitleSkeleton />
      <div className={`${style.periodButtonsContainer}`}>
        <PeriodSelectorSkeleton />
        <NavDateBtnSkeleton />
      </div>
      <div className={style.graphsContainer}>
        {/* <TotalAmountSkeleton /> */}
        <PieGraphSkeleton />
        <BarGraphSkeleton />
      </div>
    </div>
  )
}