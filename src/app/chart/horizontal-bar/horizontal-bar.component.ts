import { Options, ScaleProperties } from './../../shared/model/option.model';
import { ChartGenerationService } from './../../shared/chart.generation.service';
import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-horizontal-bar',
  templateUrl: './horizontal-bar.component.html',
  styleUrls: ['./horizontal-bar.component.scss']
})
export class HorizontalBarComponent implements OnInit {
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
     this.drawChart('horizontal-bar', data['employees'], this.options);
   });
  }


drawChart(id, data, options: Options): void{
   const selectorSvg = this.chartGenerationService.buildSvg(id, options);
   const width = options.width - options.margin.left - options.margin.right;
   const height = options.height - options.margin.top - options.margin.bottom;
   const xAxisOptions: ScaleProperties = {
       // tslint:disable-next-line:no-string-literal
                          domain : [0, d3.max(data, (d) => +d['salary'])],
                          range: [0, width]
                        };
   const yAxisOptions: ScaleProperties = {
                                domain : data.map((d) =>  d.name),
                                range: [0, height],
                                padding: 0.1
                              };


   const xAxis = this.chartGenerationService.computeLinearScale(xAxisOptions);
   const yAxis = this.chartGenerationService.computeBandScale(yAxisOptions);

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
                  .attr('height', yAxis.bandwidth())
                  // tslint:disable-next-line:no-string-literal
                   .attr('y', (d) => yAxis(d['name']))
                  // tslint:disable-next-line:no-string-literal
                  .attr('width', (d) => xAxis(d['salary']) - xAxis(0));
  }
}
