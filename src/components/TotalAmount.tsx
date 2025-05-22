'use client'

import style from '@/styles/resume.module.css';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { numberFormatter, calculatePercentageDifference } from '@/lib/utils';
import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/24/solid';
import TotalAmountSkeleton from './skeletons/TotalAmountSkeleton';
import clsx from 'clsx';

export default function TotalAmount() {

  const [currentPreviousAmount, setCurrentPreviousAmount] = useState({lastAmount: 0, currentAmount: 0});
  const [percentage, setPercentage] = useState(0);
  const [differenceAmount, setDifferenceAmount] = useState(0);
  const [ dataLoaded, setDataLoaded ] = useState(false);

  const searchParams = useSearchParams();
  const week = searchParams.get("week");
  const month = searchParams.get("month");

  useEffect(() => {
    if(week){
      fetch(`/api/resume/totalamount-weekly?week=${week}`)
        .then(res => res.json())
        .then(data => {
          setCurrentPreviousAmount(data)
          setPercentage(calculatePercentageDifference(data.lastAmount, data.currentAmount))
          setDifferenceAmount(data.currentAmount - data.lastAmount)
          setDataLoaded(true);
        })
        .catch(error => {
          console.error('error fetch total amount data', error)
        })
    }
    if(month){
        fetch(`/api/resume/totalamount-monthly?month=${month}`)
        .then(res => res.json())
        .then(data => {
          setCurrentPreviousAmount(data)
          setPercentage(calculatePercentageDifference(data.lastAmount, data.currentAmount))
          setDifferenceAmount(data.currentAmount - data.lastAmount)
          setDataLoaded(true);
        })
        .catch(error => {
          console.error('error fetch total amount data', error)
        })
    }
      }, [week, month])

      // if(!dataLoaded){
      //   return <TotalAmountSkeleton />
      // }

      const buttonClass = clsx({[style.positiveGreen] : percentage < 0,[style.negativeRed] : percentage > 0})
    
  return (
    <div className={style.totalAmountContainer}>
      <div className={style.amountContainer}>
        <h4 className={style.totalTitle}>{week ? "Week" : "Month" } Total.</h4>
        <p className={style.amount}>${numberFormatter(currentPreviousAmount.currentAmount)}</p>
        <div className={clsx(
          style.porcentaje, {
            [style.positiveGreen]:  percentage < 0,
            [style.negativeRed]:  percentage > 0
          }
        )}>
          {
            percentage < 0 ? <ChevronUpIcon width={12} /> : <ChevronDownIcon width={12} />
          }
          <p>
            {Math.abs(percentage)}%
          </p>
        </div>
      </div>
      <div className={style.textContainer}>
        <p className={style.info}>
          You spend
          <span className={buttonClass}> ${numberFormatter(Math.abs(differenceAmount))} </span>
          {
          percentage < 0 ? 
          <span className={style.positiveGreen}> less </span> : 
          <span className={style.negativeRed}> more </span>
          }
          than past{week ? "week" : "month"}
        </p>
      </div>
    </div>
  )
}