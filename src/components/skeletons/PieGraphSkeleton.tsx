import style from '@/styles/skeletonsComponents.module.css';

export default function PieGraphSkeleton(){

  return(
    <div className={style.MainGraphSkeletonContainer}>
      <div className={`${style.skeleton} ${style.skeletonPieGraph}`}></div>
      <div className={style.skeletonLegendContainer}>
        <div className={`${style.skeleton} ${style.skeletonLegend}`}></div>
        <div className={`${style.skeleton} ${style.skeletonLegend}`}></div>
        <div className={`${style.skeleton} ${style.skeletonLegend}`}></div>
        <div className={`${style.skeleton} ${style.skeletonLegend}`}></div>
        <div className={`${style.skeleton} ${style.skeletonLegend}`}></div>
      </div>
    </div>
  )
}