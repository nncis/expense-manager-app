import style from '@/styles/skeletonsComponents.module.css';

export default function BarGraphSkeleton(){

  return(
    <div className={style.skeletonContainer}>
      <div className={style.skeletonBarContainer}>
        <div className={`${style.skeletonChart} ${style.skeletonBar}`}></div>
        <div className={`${style.skeletonChart} ${style.skeletonBar}`}></div>
        <div className={`${style.skeletonChart} ${style.skeletonBar}`}></div>
        <div className={`${style.skeletonChart} ${style.skeletonBar}`}></div>
        <div className={`${style.skeletonChart} ${style.skeletonBar}`}></div>
        <div className={`${style.skeletonChart} ${style.skeletonBar}`}></div>
        <div className={`${style.skeletonChart} ${style.skeletonBar}`}></div>
      </div>
    </div>
  )
}