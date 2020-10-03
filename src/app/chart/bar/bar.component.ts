import { Options, ScaleProperties } from './../../shared/model/option.model';
import { ChartGenerationService } from './../../shared/chart.generation.service';
import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.scss']
})
export class BarComponent implements OnInit {
  data: [];
  options: Options;
  constructor( private chartGenerationService: ChartGenerationService) { }

  ngOnInit(): void {
   d3.json('/assets/data/employee.json').then((data) => {
     this.options = {
      width: 1200,
      height: 520,
      margin : {top: 20, right: 20, bottom: 40, left: 50},
      backgroundColor: '',
      responsive: true,
      xAxis : {padding: 0.1}
    };
     // tslint:disable-next-line:no-string-literal
     this.drawChart('bar', data['employees'], this.options);
   });
  }


drawChart(id, data, options: Options): void{
   const selectorSvg = this.chartGenerationService.buildSvg(id, options);
   const width = options.width - options.margin.left - options.margin.right;
   const height = options.height - options.margin.top - options.margin.bottom;
   const xAxisOptions: ScaleProperties = {
                          domain : data.map((d) =>  d.name),
                          range: [0, width],
                          padding: 0.1
                        };
   const yAxisOptions: ScaleProperties = {
       // tslint:disable-next-line:no-string-literal
                                domain : [0, d3.max(data, (d) => +d['salary'])],
                                range: [height, 0]
                              };


   const xAxis = this.chartGenerationService.computeBandScale(xAxisOptions);
   const yAxis = this.chartGenerationService.computeLinearScale(yAxisOptions);

   selectorSvg.attr('transform', 'translate(' + options.margin.left + ',' + options.margin.top + ')');
    // add the x Axis
   selectorSvg.append('g')
              .classed('x-axis', true)
              .attr('transform', 'translate(0,' + height + ')')
              .call(d3.axisBottom(xAxis));

   selectorSvg.append('g').classed('y-axis', true).call(d3.axisLeft(yAxis));

   const chartContainer = selectorSvg.append('g').classed('chart-container', true);

   chartContainer.selectAll('.bar')
                  .data(data)
                  .enter().append('rect')
                  .attr('class', 'bar')
                  // tslint:disable-next-line:no-string-literal
                  .attr('x', (d) => xAxis(d['name']))
                  .attr('width', xAxis.bandwidth())
                  // tslint:disable-next-line:no-string-literal
                  .attr('y', (d) => yAxis(d['salary']))
                  // tslint:disable-next-line:no-string-literal
                  .attr('height', (d) => height - yAxis(d['salary']));
  }
}
