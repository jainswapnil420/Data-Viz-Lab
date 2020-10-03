import { Options, ScaleProperties } from './../../shared/model/option.model';
import { ChartGenerationService } from './../../shared/chart.generation.service';
import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-line',
  templateUrl: './line.component.html',
  styleUrls: ['./line.component.scss']
})
export class LineComponent implements OnInit {
  data: [];
  options: Options;
  constructor( private chartGenerationService: ChartGenerationService) { }

  ngOnInit(): void {
    d3.json('/assets/data/products.json').then((data) => {
      this.options = {
       width: 1200,
       height: 520,
       margin : {top: 20, right: 20, bottom: 40, left: 50},
       backgroundColor: '',
       responsive: true,
       xAxis : {padding: 0.1}
     };
      // tslint:disable-next-line:no-string-literal
      this.drawChart('line', data['products'], data['colors'], this.options);
    });
   }


drawChart(id, data, colors: [], options: Options): void{
  const selectorSvg = this.chartGenerationService.buildSvg(id, options);
  const width = options.width - options.margin.left - options.margin.right;
  const height = options.height - options.margin.top - options.margin.bottom;
  const xAxisOptions: ScaleProperties = {
                         domain : data.map((d) =>  d.year),
                         range: [0, width],
                         padding: 0.1
                       };
  const yAxisOptions: ScaleProperties = {
      // tslint:disable-next-line:no-string-literal
                               domain : [0, d3.max(data, (d) => +d['sales'])],
                               range: [height, 0]
                             };

  const xAxis = this.chartGenerationService.computePointScale(xAxisOptions);
  const yAxis = this.chartGenerationService.computeLinearScale(yAxisOptions);

  selectorSvg.attr('transform', 'translate(' + options.margin.left + ',' + options.margin.top + ')');
   // add the x Axis
  selectorSvg.append('g')
             .classed('x-axis', true)
             .attr('transform', 'translate(0,' + height + ')')
             .call(d3.axisBottom(xAxis));

  selectorSvg.append('g').classed('y-axis', true).call(d3.axisLeft(yAxis));

  const chartContainer = selectorSvg.append('g').classed('chart-container', true);
        // Add the line
  const line = d3.line()
        .curve(d3.curveCardinal)
          // tslint:disable-next-line:no-string-literal
          .x((d) => xAxis(d['year']))
          // tslint:disable-next-line:no-string-literal
          .y((d) => yAxis(d['sales']));


  // tslint:disable-next-line:no-string-literal
  const products = Array.from(d3.group(data, d => d['name']), ([key, value]) => ({key, value}));
  chartContainer.selectAll('line')
  .data(products)
  .enter()
  .append('g')
  .classed('line', true)
  .append('path')
        .datum((d) => d.value)
        .attr('fill', 'none')
        .attr('stroke', (d, i) => colors[i])
        .attr('stroke-width', 1.5)
        .attr('d', line);

 }
}
