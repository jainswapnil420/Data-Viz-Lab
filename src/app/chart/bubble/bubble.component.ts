import { Options, ScaleProperties } from './../../shared/model/option.model';
import { ChartGenerationService } from './../../shared/chart.generation.service';
import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
@Component({
  selector: 'app-bubble',
  templateUrl: './bubble.component.html',
  styleUrls: ['./bubble.component.scss']
})
export class BubbleComponent implements OnInit {

  data: [];
  options: Options;
  constructor( private chartGenerationService: ChartGenerationService) { }

  ngOnInit(): void {
    d3.json('/assets/data/bubble.json').then((data) => {
      this.options = {
       width: 1200,
       height: 520,
       margin : {top: 20, right: 20, bottom: 40, left: 50},
       backgroundColor: '',
       responsive: true,
       xAxis : {padding: 0.1}
     };
      // tslint:disable-next-line:no-string-literal
      this.drawChart('bubble', data['machine'], data['colors'], this.options);
    });
   }



drawChart(id, data, colors: [], options: Options): void{
  const selectorSvg = this.chartGenerationService.buildSvg(id, options);
  const width = options.width - options.margin.left - options.margin.right;
  const height = options.height - options.margin.top - options.margin.bottom;
  const xAxisOptions: ScaleProperties = {
                         // tslint:disable-next-line:no-string-literal
                         domain : [0, d3.max(data, (d) => +d['horsepower']) + 2],
                         range: [0, width]
                       };
  const yAxisOptions: ScaleProperties = {
      // tslint:disable-next-line:no-string-literal
                               domain : [0, d3.max(data, (d) => +d['mileage'] + 5000)],
                               range: [height, 0]
                             };

  const xAxis = this.chartGenerationService.computeLinearScale(xAxisOptions);
  const yAxis = this.chartGenerationService.computeLinearScale(yAxisOptions);

  selectorSvg.attr('transform', 'translate(' + options.margin.left + ',' + options.margin.top + ')');
   // add the x Axis
  selectorSvg.append('g')
             .classed('x-axis', true)
             .attr('transform', 'translate(0,' + height + ')')
             .call(d3.axisBottom(xAxis));

  selectorSvg.append('g').classed('y-axis', true).call(d3.axisLeft(yAxis));

  const chartContainer = selectorSvg.append('g').classed('chart-container', true);


  const bubbleScaleOptions: ScaleProperties = {
    // tslint:disable-next-line:no-string-literal
                             domain : [0, d3.max(data, (d) => +d['size'])],
                             range: [0, 50]
                           };
  const bubbleAxis = this.chartGenerationService.computeLinearScale(bubbleScaleOptions);
  chartContainer.append('g')
      .selectAll('circle')
      .data(data)
      .join('circle')
      .attr('fill', (d, i) => colors[i])
      .attr('cx', d => xAxis(d.horsepower))
      .attr('cy', d => yAxis(d.mileage))
      .attr('r', d => bubbleAxis(d.size));

}
}
