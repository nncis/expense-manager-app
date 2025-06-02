import style from '@/styles/loading.module.css';

export default function PaginationSkeleton(){
  return (
    <div className={`${style.paginationButton} ${style.skeleton}`}>

    </div>
  )
}