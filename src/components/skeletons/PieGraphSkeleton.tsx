import style from '@/styles/skeletonsComponents.module.css';

export default function PieGraphSkeleton(){

  return(
    <div className={style.skeletonContainer}>
      <div className={`${style.skeletonChart} ${style.skeletonPieGraph}`}></div>
      <div className={style.skeletonLegendContainer}>
        <div className={`${style.skeletonChart} ${style.skeletonLegend}`}></div>
        <div className={`${style.skeletonChart} ${style.skeletonLegend}`}></div>
        <div className={`${style.skeletonChart} ${style.skeletonLegend}`}></div>
        <div className={`${style.skeletonChart} ${style.skeletonLegend}`}></div>
        <div className={`${style.skeletonChart} ${style.skeletonLegend}`}></div>
      </div>
    </div>
  )
}