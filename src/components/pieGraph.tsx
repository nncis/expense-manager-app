'use client'

import * as d3 from "d3";
import React, { useEffect, useRef, useState } from 'react';
import { ExpenseByDate, ExpenseAmountByDate } from '@/lib/definitions';
import { numberFormatter } from '@/lib/utils';
import style from '@/styles/resume.module.css';

interface GraphProp {
  data: ExpenseByDate[];
}

export default function PieGraph({ data }: GraphProp) {

  const chartRef = useRef<SVGSVGElement | null>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

    // Agrupar datos por categoría y sumar los montos
  const dataResult: ExpenseAmountByDate[] = Object.values(
    data.reduce<Record<string, ExpenseAmountByDate>>((acc, item) => {
      if (acc[item.category]) {
        acc[item.category].amount += item.amount;
      } else {
        acc[item.category] = { category: item.category, amount: item.amount };
      }
      return acc;
    }, {})
  ).sort((a, b) => a.amount - b.amount);

  useEffect(() => {

    const handleResize = () => {
      const containerWidth = chartRef.current?.parentElement?.clientWidth || 326;

      setDimensions({ width: containerWidth, height: containerWidth * 0.75 });
    };

    window.addEventListener('resize', handleResize);

    handleResize(); // Llama al handler al montar el componente

    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
    const dataLength = dataResult.length > 6 ? dataResult.length + 2.5 : dataResult.length;

    //Clean SVG
    svg.selectAll("*").remove();

    //Pie Graph config
    const arc = d3.arc<d3.PieArcDatum<ExpenseAmountByDate>>()
      .innerRadius(radius * 0.5)
      .outerRadius(radius);

    const pie = d3.pie<ExpenseAmountByDate>()
      .value(d => d.amount);

    //Create a g element for the Pie Graph
    const g = svg
      .append('g')
      .attr('transform', `translate(${(innerWidth / 5)} , ${(innerHeight / 2.3 )})`)
      .attr('viewBox', `0 0 ${width} ${height}`) // Relativo a un sistema de coordenadas base
      .attr('preserveAspectRatio', 'xMidYMid meet') // Mantiene la relación de aspecto
      .classed('responsive', true);



    //Tooltip
    const tooltip = d3.select('body')
      .append('div')
      .attr('id', 'tooltip')
      .style('position', 'absolute')
      .style('background', 'rgba(0, 0, 0, 0.7)')
      .style('color', '#fff')
      .style('padding', '5px 10px')
      .style('border-radius', '5px')
      .style('pointer-events', 'none')
      .style('opacity', 0);

    //Graphing the pie
    const arcs = g.selectAll('path')
      .data(pie(dataResult))
      .enter()
      .append('path')
      .attr('fill', d => color(d.data.category))
      .attr('stroke', 'black')
      .attr('stroke-width', 2)
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
    arcs.on('mouseover', function (event, d) {
      tooltip
        .style('left', `${event.pageX + 10}px`)
        .style('top', `${event.pageY - 20}px`)
        .style('opacity', 1)
        .html(`
                  <strong>${d.data.category}</strong><br />
                  Valor: $${numberFormatter(d.data.amount)}
                `);
    })
      .on('mouseout', () => {
        tooltip.style('opacity', 0);
      });

    //Legend
    const legend = svg
      .append('g')
      .attr('transform', `translate(${(innerWidth / 2.3)}, ${(innerHeight / 2.5 - dataLength * 8)})`);

    const legendItems = legend
      .selectAll('.legend-item')
      .data(dataResult)
      .enter()
      .append('g')
      .attr('class', 'legend-item')
      .attr('transform', (_, i) => `translate(0, ${i * 25})`);

    //draw legend
    legendItems
      .append('circle')
      .attr('r', 8)
      .attr('stroke', 'black')
      .attr('stroke-width', 1.5)
      .attr('fill', d => color(d.category.toString()));

    legendItems
      .append('text')
      .attr('x', 25)
      .attr('y', 4)
      .text(d => d.category)
      .style('font-size', '1.5rem')
      .style('alignment-baseline', 'middle');

      legendItems
      .append('text')
      .attr('x', `${innerWidth / 3}`)
      .attr('y', 4)
      .text(d => `$${numberFormatter(d.amount)}`)
      .style('font-size', '1.4rem')
      .style('alignment-baseline', 'middle');

    return () => {
      tooltip.remove();
    };
  }, [data])
  return (
    <div className={style.SVGpieGraphContainer}>
      <svg
        className={style.SVGpieChart}
        ref={chartRef}
      ></svg>
    </div>
  )
}