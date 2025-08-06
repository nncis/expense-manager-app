'use client'

import * as d3 from "d3";
import React, { useEffect, useRef, useState } from 'react';
import { ExpenseAmountByDate } from '@/lib/definitions';
import { numberFormatter } from '@/lib/utils';
import style from '@/styles/resume.module.css';
import { useSearchParams } from 'next/navigation';

export default function PieGraph() {
  const chartRef = useRef<SVGSVGElement | null>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [dataExpense, setDataExpense] = useState<ExpenseAmountByDate[]>([]);
  const [isMobile, setIsMobile ] = useState(false);

  const searchParams = useSearchParams();
  const week = searchParams.get("week");
  const month = searchParams.get("month");

  useEffect(() => {

    const handleResize = () => {
      console.log(chartRef.current?.parentElement?.clientWidth)
      
      const containerWidth = chartRef.current?.parentElement?.clientWidth || 326;
      setDimensions({ width: containerWidth, height: containerWidth * 0.75 });
    };

    window.addEventListener('resize', handleResize);

    handleResize(); // Llama al handler al montar el componente

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if(week){
      fetch(`/api/resume/piegraph-weekly?week=${week}`)
        .then(res => res.json())
        .then(data => {
          setDataExpense(data);
        })
        .catch(error => {
          console.error('error fetch pie graph data', error)
        })
    } else if(month){
      fetch(`/api/resume/piegraph-monthly?month=${month}`)
      .then(res => res.json())
      .then(data => {
        setDataExpense(data)
      })
      .catch(error => {
        console.error('error fetch pie graph data', error)
      })
    } 
        
      }, [week, month])
      
  useEffect(() => {
      if (!chartRef.current) return;

      //SVG config
    const svg = d3.select(chartRef.current);
    const { width, height } = dimensions;
    const margin = { top: 10, right: 10, bottom: 10, left: 10 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;
    const radius = Math.min(width, height) / 5;
    const color = d3.scaleOrdinal(d3.schemePastel1);
    const dataLength = dataExpense.length;
    const title = week ? "Total Weekly Amount by Category" : "Total Monthly Amount by Category"

    if(width < 450){
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }

    const fontSizeDesk = dataLength > 6 ? '1.3rem' : '1.5rem';
    const fontSizeMobile = dataLength > 6 ? '1.3rem' : '1.5rem';

    const circleDesk = dataLength > 6 ? 6 : 7;
    const circleMobile = dataLength > 6 ? 5 : 6;

    //Clean SVG
    svg.selectAll("*").remove();

    //Pie Graph config
    const arc = d3.arc<d3.PieArcDatum<ExpenseAmountByDate>>()
      .innerRadius(radius * 0.5)
      .outerRadius(radius);

    const pie = d3.pie<ExpenseAmountByDate>()
      .value(d => d.amount);

    //Title
    svg.append('text')
    .attr("x", 15)         // posición horizontal
    .attr("y", 33)          // posición vertical
    .text(title)        // contenido del texto
    .attr("font-size", "1.8rem")
    .attr("fill", "black"); // color del texto
    
    //Create a g element for the Pie Graph
    const g = svg
      .append('g')
      .attr('transform', `translate(${(innerWidth / 5)} , ${(height < 266 ? innerHeight / 1.8 : innerHeight / 2.3 )})`)
      .attr('viewBox', `0 0 ${width} ${height}`) // Relativo a un sistema de coordenadas base
      .attr('preserveAspectRatio', 'xMidYMid meet') // Mantiene la relación de aspecto
      .classed('responsive', true);

    //Tooltip
    // const tooltip = d3.select('body')
    //   .append('div')
    //   .attr('id', 'tooltip')
    //   .style('position', 'absolute')
    //   .style('background', 'rgba(0, 0, 0, 0.7)')
    //   .style('color', '#fff')
    //   .style('padding', '5px 10px')
    //   .style('border-radius', '5px')
    //   .style('pointer-events', 'none')
    //   .style('opacity', 0);

    //Graphing the pie
    const arcs = g.selectAll('path')
      .data(pie(dataExpense))
      .enter()
      .append('path')
      .attr('fill', d => color(d.data.category))
      // .attr('stroke', 'black')
      // .attr('stroke-width', 1)
      .each(function (this: SVGPathElement, d) {
        (this as any)._current = { ...d, startAngle: 0, endAngle: 0 };
      });

    arcs.transition()
      .duration(1000)
      .attrTween("d", function (this: SVGPathElement & { _current?: d3.PieArcDatum<ExpenseAmountByDate> }, d) {
        if (!this._current) this._current = d; // Inicializa _current si no existe
        const interpolate = d3.interpolate(this._current, d);
        this._current = d; // Guarda el nuevo estado
        return function (t) {
          return arc(interpolate(t))!;
        };
      });

    //draw tooltip
    // arcs.on('mouseover', function (event, d) {
    //   tooltip
    //     .style('left', `${event.pageX + 10}px`)
    //     .style('top', `${event.pageY - 20}px`)
    //     .style('opacity', 1)
    //     .html(`
    //               <strong>${d.data.category}</strong><br />
    //               Valor: $${numberFormatter(d.data.amount)}
    //             `);
    // })
    //   .on('mouseout', () => {
    //     tooltip.style('opacity', 0);
    //   });

    //Legend
    const legend = svg
      .append('g')
      .attr('transform', `translate(${(innerWidth / 2.3)}, 
      ${(
        isMobile 
        ? 
        height / 2 - dataLength * 8
        : 
        innerHeight / 2.5 - dataLength * 7
      )})`);

    const legendItems = legend
      .selectAll('.legend-item')
      .data(dataExpense)
      .enter()
      .append('g')
      .attr('class', 'legend-item')
      .attr('transform', (_, i) => `translate(0, ${dataLength > 6 ? i * 20 : i * 25})`);

    //draw legend
    legendItems
      .append('circle')
      .attr('r', `${isMobile ? circleMobile : circleDesk}`)
      // .attr('stroke', 'black')
      // .attr('stroke-width', 1.5)
      .attr('fill', d => color(d.category.toString()));

    legendItems
      .append('text')
      .attr('x', 12)
      .attr('y', 2)
      .text(d => d.category)
      .style('font-size', `${isMobile ? fontSizeMobile : fontSizeDesk}`)
      .style('alignment-baseline', 'middle');

      legendItems
      .append('text')
      .attr('x', `${innerWidth / 3}`)
      .attr('y', 4)
      .text(d => `$${numberFormatter(d.amount)}`)
      .style('font-size', `${isMobile ? fontSizeMobile : fontSizeDesk}`)
      .style('alignment-baseline', 'middle');

    // return () => {
    //   tooltip.remove();
    // };

  }, [dataExpense])

  return (
    <> 
      <div className={style.SVGpieGraphContainer}>
          <svg className={style.SVGpieChart} ref={chartRef}>
          </svg>
      </div>
    </>
  )
}