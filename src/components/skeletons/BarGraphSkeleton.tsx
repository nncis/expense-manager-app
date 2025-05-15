import style from '@/styles/skeletonsComponents.module.css';

export default function BarGraphSkeleton(){

  return(
    <div className={style.MainGraphSkeletonContainer}>
      <div className={style.skeletonBarContainer}>
        <div className={`${style.skeleton} ${style.skeletonBar}`}></div>
        <div className={`${style.skeleton} ${style.skeletonBar}`}></div>
        <div className={`${style.skeleton} ${style.skeletonBar}`}></div>
        <div className={`${style.skeleton} ${style.skeletonBar}`}></div>
        <div className={`${style.skeleton} ${style.skeletonBar}`}></div>
        <div className={`${style.skeleton} ${style.skeletonBar}`}></div>
        <div className={`${style.skeleton} ${style.skeletonBar}`}></div>
      </div>
    </div>
  )
}