import style from '@/styles/loading.module.css';
import TitleSkeleton from '@/components/skeletons/TitleSkeleton';
import FilterButtonsSkeleton from '@/components/skeletons/filterButtonsSkeleton';
import TableSkeleton from '@/components/skeletons/tableSkeleton';
import PaginationSkeleton from '@/components/skeletons/PaginationSkeleton';

export default function Loading(){
  return (
    <div className={style.resumeMainContainer}>
      <div className={style.titleContainer}>
        <TitleSkeleton />
      </div>
      <div className={style.filterButtonsContainer}>
        <FilterButtonsSkeleton />
      </div>
      <div className={style.tableContainer}>
        <TableSkeleton />
      </div>
      <div className={style.paginationContainer}>
        <PaginationSkeleton />
      </div>
    </div>
  )
}