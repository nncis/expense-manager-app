'use client'

import * as d3 from "d3";
import React, { useEffect, useRef, useState, Suspense } from 'react';
import { ExpenseTotalAmountPerMonth, GraphData } from '@/lib/definitions';
import style from '@/styles/resume.module.css';
import { numberFormatter } from '@/lib/utils';
import { useSearchParams } from 'next/navigation';

export default function YearGraph(props: {period: string}) {

  const chartRef = useRef<SVGSVGElement | null>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 60 });
  const [dataExpense, setDataExpense] = useState<GraphData[]>([]);
  const [isMobile, setIsMobile ] = useState(false);
  
  const searchParams = useSearchParams();
  const week = searchParams.get("week");
  const month = searchParams.get("month");
  
  useEffect(() => {  
    const handleResize = () => {
      const containerWidth = chartRef.current?.parentElement?.clientWidth || 326;
      setDimensions({ width: containerWidth, height: containerWidth * 0.75 }); // Relación de aspecto 4:
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Llama al handler al montar el componente

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (week) {
      fetch(`/api/resume/bargraph-weekly?week=${week}`)
        .then(res => res.json())
        .then(data => {
          setDataExpense(data)
        })
        .catch(error => {
          console.error('error fetch bar graph data', error)
        })
    } 
    
    if (month) {
      fetch(`/api/resume/bargraph-monthly?month=${month}`)
        .then(res => res.json())
        .then(data => {
          setDataExpense(data)
        })
        .catch(error => {
          console.error('error fetch bar graph data', error)
        })
    }

  }, [week, month])

  useEffect(() => {
    if (!chartRef.current || dataExpense.length === 0) return;
    
    const yearMonths = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];

    const daysOfWeek = [
      'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'
    ];

    //SVG config
    const { width, height } = dimensions;
    const margin = { top: 40, right: 10, bottom: 40, left: 20 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    if(width < 450){
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
    //si es month y mobile 1.1rem //
    // const fontSizeMonthMobile = props.period == "month" ? '1.1rem'
    const fontSizeMobile =  isMobile ? '1.1rem' : '1.5rem';


    //Select and clean the SVG
    const svg = d3.select(chartRef.current);
    svg.selectAll("*").remove();

    //Scales
    const xScale = d3.scaleBand()
      .domain(props.period == "monthly" ? yearMonths : daysOfWeek) //change depends if weekly or monthly
      .range([margin.left, width - margin.right])
      .padding(0.6);

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(dataExpense, d => d.total) || 0]) // Montos en el eje Y
      .nice()
      .range([innerHeight - margin.bottom, margin.top]);

    //---Axis---//
    const xAxis = d3.axisBottom(xScale);
 

    //Draw Axis
    svg.append('g')
      .attr('transform', `translate(0, ${innerHeight - margin.bottom})`)
      .attr("class", "x-axis")
      .call(xAxis);

    //X Axis Dashrray
      svg.selectAll(".x-axis path")
      .attr("stroke-dasharray", "3")
      .attr("stroke-width", 2)
      .attr("stroke", "black");

    //Take away line's ticks
    svg.selectAll(".x-axis .tick line")
       .attr("stroke", "none");

    svg.selectAll(".x-axis text")
      .style("font-size", `${props.period == "monthly" && isMobile ? '1.2rem' : '1.5rem'}`)
      .style("font-family", "Josefin Sans")
      .style("font-weight", "500")

    //Max Total
    const maxValue = d3.max(dataExpense, d => d.total) ?? 0;
    const formatValue = d3.format(".2s");

    svg.append("text")
      .attr("x", margin.right)
      .attr("y", margin.top + 20)
      .text(formatValue(maxValue))
      .attr("font-size", "1.5rem")
      .attr("fill", "black");


    // svg.append('g')
    //   .attr('transform', `translate(${margin.left}, 0)`)
    //   .attr("class", "y-axis")
    //   .call(yAxis);


      //Draw the horizontal lines
        
        svg.append("line")
        .attr("x1", margin.left)
        .attr("x2", width - margin.right)   
        .attr("y1", margin.top) 
        .attr("y2", margin.top) 
        .attr("stroke", "black")
        .attr("stroke-width", 2)
        .attr("stroke-dasharray", "3"); 

        svg.append("line")
        .attr("x1", margin.left)
        .attr("x2", width - margin.right)   
        .attr("y1", height / 2 - margin.top) 
        .attr("y2",height / 2 - margin.top) 
        .attr("stroke", "black")
        .attr("stroke-width", 1)
        .attr("stroke-dasharray", "3"); 


    // Barras con animación
    svg.selectAll('rect')
      .data(dataExpense)
      .enter()
      .append('rect')
      .attr('x', d => xScale(d.date) || 0) 
      .attr('y', innerHeight - margin.bottom) 
      .attr('width', xScale.bandwidth()) 
      .attr('height', 0) 
      .attr('fill', 'steelblue')
      .attr('rx', 5) 
      .attr('ry', 5) 
      .attr('stroke', 'black')
      .attr('stroke-width', 1.5)
      .transition() 
      .duration(800) 
      .attr('y', d => yScale(d.total)) 
      .attr('height', d => innerHeight - margin.bottom - yScale(d.total)) 
      .delay((d, i) => i * 100)

    //----Tooltip----//
    d3.select("#tooltip").remove();
    const tooltip = d3.select("#svgContainer")
      .append("div")
      .attr("id", "bartooltip")
      .style("position", "absolute")
      .style("background", "#F6BA3D")
      .style("border","2px solid black")
      .style("color", "black")
      .style("padding", "5px 10px")
      .style("border-radius", "5px")
      .style("pointer-events", "none")
      .style("opacity", 0);

    svg.selectAll("rect")
    .on("mouseover", function (event, d) {
      const data = d as ExpenseTotalAmountPerMonth;
      const [x] = d3.pointer(event);
      tooltip.style("opacity", 1)
        .html(`$${numberFormatter(data.total)}`)
        .style("left", `${x - 25}px`)
        .style("top", `5px`);
    })
    .on("mouseout", () => tooltip.style("opacity", 0)); 
  
  }, [dataExpense])


  return (
    <>
      <div id="svgContainer" className={style.SVGbarChartContainer}>
        <svg
          className={style.SVGbarChart}
          ref={chartRef}
          viewBox={`0 0 ${dimensions.width} ${dimensions.height - 60}`}
          preserveAspectRatio="xMidYMid meet"
        ></svg>
      </div>
    </>
  )
}