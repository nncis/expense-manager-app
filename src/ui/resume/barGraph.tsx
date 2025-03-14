'use client'

import * as d3 from "d3";
import React, { useEffect, useRef, useState } from 'react';
import { ExpenseTotalAmountPerMonth } from '@/lib/definitions';
import style from '@/styles/resume.module.css';
import { numberFormatter } from '@/lib/utils';

interface GraphProp {
  data: ExpenseTotalAmountPerMonth[];
}

export default function YearGraph({ data }: GraphProp) {
  const chartRef = useRef<SVGSVGElement | null>(null);
  const [dimensions, setDimensions] = useState({ width: 326, height: 244 });
  
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
    if (!chartRef.current || data.length === 0) return;
    
    const yearMonths = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];
    //SVG config
    const { width, height } = dimensions;
    const margin = { top: 20, right: 10, bottom: 30, left: 40 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    //Select and clean the SVG
    const svg = d3.select(chartRef.current);
    svg.selectAll("*").remove();

    //Scales
    const xScale = d3.scaleBand()
      .domain(yearMonths) // Meses en el eje X
      .range([margin.left, width - margin.right])
      .padding(0.1);

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.total) || 0]) // Montos en el eje Y
      .nice()
      .range([innerHeight - margin.bottom, margin.top]);

    //Axis
    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale)
    .tickFormat(d => {
      const num = Number(d);
      if (num >= 1_000_000) return `${num / 1_000_000}M`; // 1,000,000 → "1M"
      if (num >= 1_000) return `${num / 1_000}k`;         // 100,000 → "100k"
      return `${num}`;  // Convertir a string explícitamente
    });

    //Tooltip
    d3.select("#tooltip").remove();
    const tooltip = d3.select("body")
      .append("div")
      .attr("id", "bartooltip")
      .style("position", "absolute")
      .style("background", "rgba(0, 0, 0, 0.7)")
      .style("color", "#fff")
      .style("padding", "5px 10px")
      .style("border-radius", "5px")
      .style("pointer-events", "none")
      .style("opacity", 0);

    //Draw axis
    svg.append('g')
      .attr('transform', `translate(0, ${innerHeight - margin.bottom})`)
      .call(xAxis);

    svg.append('g')
      .attr('transform', `translate(${margin.left}, 0)`)
      .call(yAxis);


    // Barras con animación
    svg.selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', d => xScale(d.month) || 0) 
      .attr('y', innerHeight - margin.bottom) 
      .attr('width', xScale.bandwidth()) 
      .attr('height', 0) 
      .attr('fill', 'steelblue')
      .attr('rx', 5) 
      .attr('ry', 5) 
      .transition() 
      .duration(800) 
      .attr('y', d => yScale(d.total)) 
      .attr('height', d => innerHeight - margin.bottom - yScale(d.total)) 
      .delay((d, i) => i * 100)


    svg.selectAll("rect")
    .on("mouseover", function (event, d) {
      const data = d as ExpenseTotalAmountPerMonth;

      tooltip.style("opacity", 1)
        .html(`<strong>${data.month}</strong><br>$${numberFormatter(data.total)}`)
        .style("left", `${event.pageX}px`)
        .style("top", `${event.pageY - 30}px`);
    })
    .on("mouseout", () => tooltip.style("opacity", 0)); 
  
  }, [data])

  return (
    <>
      <div className={style.SVGbarChartContainer}>
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