import style from '@/styles/skeletonsComponents.module.css';

export default function TotalAmountSkeleton(){

  return(
    <div className={style.infoContainerSkeleton}>
      <div className={`${style.amountContainer}`}>
        <div className={`${style.info} ${style.skeleton}`}></div>
        <div className={`${style.info} ${style.skeleton}`}></div>
        <div className={`${style.info} ${style.skeleton}`}></div>
      </div>
      <div className={`${style.textContainer}`}>
        <div className={`${style.text}  ${style.skeleton}`}></div>
        <div className={`${style.text}  ${style.skeleton}`}></div>
        <div className={`${style.text}  ${style.skeleton}`}></div>
      </div>
    </div>
  )
}