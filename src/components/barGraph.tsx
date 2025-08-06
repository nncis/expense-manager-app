'use client'

import * as d3 from "d3";
import React, { useEffect, useRef, useState, Suspense } from 'react';
import { ExpenseTotalAmountPerMonth, GraphData } from '@/lib/definitions';
import style from '@/styles/resume.module.css';
import { numberFormatter } from '@/lib/utils';
import { useSearchParams } from 'next/navigation';

export default function YearGraph() {

  const chartRef = useRef<SVGSVGElement | null>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 60 });
  const [dataExpense, setDataExpense] = useState<GraphData[]>([]);
  const [isMobile, setIsMobile ] = useState(false);
  
  const searchParams = useSearchParams();
  const week = searchParams.get("week");
  const month = searchParams.get("month");
  const period = searchParams.get("period") || "weekly";
  
  
  useEffect(() => {  
    const handleResize = () => {
      const containerWidth = chartRef.current?.parentElement?.clientWidth || 326;

      setDimensions({ width: containerWidth, height: containerWidth * 0.75 }); // Relación de aspecto 4:
      
    if(dimensions.width < 450){
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }

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

  //--------  GRAPHIC -------------//
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
    const margin = { top: 60, right: 10, bottom: 20, left: 30 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;
    const title = week ? "Daily Total Amount" : "Monthly Total Amount"
    
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

    //--Title--//
    svg.append('text')
    .attr("x", `${isMobile ? 18 : 15}`)
    .attr("y", `${
      //Small Screen Mobile 
      isMobile && width < 390 ? 5 
      : 
      //Big Screen Mobile
      isMobile ? 25
      : 
      //Desk Screen
      33
    }`)
    .text(`${title}`)
    .attr("font-size", "1.8rem")
    .attr("fill", "black"); 

    //Scales
    const xScale = d3.scaleBand()
      .domain(period == "monthly" ? yearMonths : daysOfWeek) //Scale change depend if it's weekly or monthly period
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

    //X Axis 
      svg.selectAll(".x-axis path")
      .attr("stroke-width", 1)
      .attr("stroke", "black");

    //Take away line's ticks
    svg.selectAll(".x-axis .tick line")
       .attr("stroke", "none");

    svg.selectAll(".x-axis text")
      .style("font-size", `${period == "monthly" && isMobile ? '1.2rem' : '1.5rem'}`)
      .style("font-family", "Josefin Sans")
      .style("font-weight", "500")

    //Max Total
    const maxValue = d3.max(dataExpense, d => d.total) ?? 0;
    const ceilValue = Math.ceil(maxValue / 1000) * 1000;
    const formatValue = d3.format(".2s");
    const formatted = formatValue(ceilValue);

    //MidTotal
    const halfTotal = ceilValue / 2;
    const halfTotalFormatted = formatValue(halfTotal);
    

  //--Axis-Labels--//

    //Center label
    svg.append("text")
      .attr("x", `${isMobile ? margin.right - 3 : margin.right - 15}`)
      .attr("y", innerHeight / 2 + margin.bottom)
      .text(halfTotalFormatted)
      .attr("font-size", "1.3rem")
      .attr("fill", "black");

    //Top label
    svg.append("text")
      .attr("x",`${isMobile ? margin.right - 3: margin.right - 15}`)
      .attr("y", margin.top + 3)
      .text(formatted)
      .attr("font-size", "1.3rem")
      .attr("fill", "black");

    //Bottom label
    svg.append("text")
      .attr("x", `${isMobile ? margin.right : margin.right - 10}`)
      .attr("y", `${
        isMobile ? innerHeight - margin.bottom + 5 : 
        innerHeight - margin.bottom
      }`)
      .text("0")
      .attr("font-size", "1.3rem")
      .attr("fill", "black");

      //--Draw the horizontal lines--//
        
      //Top line
      svg.append("line")
      .attr("x1", margin.left)
      .attr("x2", width - margin.right)   
      .attr("y1",  margin.top) 
      .attr("y2", margin.top) 
      .attr("stroke", "black")
      .attr("stroke-width", 1)
      
      //Center line
        svg.append("line")
        .attr("x1", margin.left)
        .attr("x2", width - margin.right)   
        .attr("y1", innerHeight / 2 + margin.bottom) 
        .attr("y2", innerHeight / 2 + margin.bottom) 
        .attr("stroke", "black")
        .attr("stroke-width", 1)

    //Bar with animation
    svg.selectAll('rect')
      .data(dataExpense)
      .enter()
      .append('rect')
      .attr('x', d => xScale(d.date) || 0) 
      .attr('y', innerHeight - margin.bottom) 
      .attr('width', xScale.bandwidth()) 
      .attr('height', 0) 
      .attr('fill', 'steelblue')
      .attr('rx', 4) 
      .attr('ry', 4) 
      // .attr('stroke', 'black')
      // .attr('stroke-width', 1.5)
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
      .style("background", "#FFFFFF")
      .style("border","2px solid #D9D9D9")
      .style("color", "black")
      .style("padding", "5px 10px")
      .style("border-radius", "5px")
      .style("pointer-events", "none")
      .style("opacity", 0);

    svg.selectAll("rect")
    .on("mouseover", function (event, d) {

      const rect = d3.select(this);
      const barX = +rect.attr("x") + (+rect.attr("width") / 2);
      const barY = +rect.attr("y");
      const barHeight = +rect.attr("height");


      const svgEl = svg.node()!;
      const containerHeight = svgEl.getBoundingClientRect().height;
      console.log(containerHeight, "ClientHeight")
    
        if (!svgEl) return;

      const data = d as ExpenseTotalAmountPerMonth;

      // console.log(barY, "barY")
      // console.log(barHeight, "barHeight")
      // console.log(height, "Height")
      
      // console.log(containerHeight - barHeight - barY)

      // const [x] = d3.pointer(event);
      tooltip.style("opacity", 1)
        .html(`$${numberFormatter(data.total)}`)
        .style("left", `${barX - 45}px`)
        .style("top",`${
          //Small screen mobile
          isMobile && width < 390 ? 
          containerHeight - barHeight
          :
          //Desk screen
          containerHeight - barHeight - margin.top
        }px`);
    })
    .on("mouseout", () => tooltip.style("opacity", 0)); 
  
  }, [dataExpense])


  return (
    <>
      <div id="svgContainer" className={style.SVGbarChartContainer}>
        <svg
          id="svgBarChar"
          className={style.SVGbarChart}
          ref={chartRef}
          viewBox={`0 0 ${dimensions.width} ${dimensions.height - 60}`}
          preserveAspectRatio="xMidYMid meet"
        ></svg>
      </div>
    </>
  )
}