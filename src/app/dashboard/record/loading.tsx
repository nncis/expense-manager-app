import style from '@/styles/loading.module.css';
import TitleSkeleton from '@/components/skeletons/TitleSkeleton';
import TableSkeleton from '@/components/skeletons/tableSkeleton';

export default function Loading(){
  return (
    <div className={style.resumeMainContainer}>
      <div className={style.titleContainer}>
        <TitleSkeleton />
      </div>
      <div className={style.formRecordContainer}>
        <TableSkeleton />
      </div>
    </div>
  )
}