import { ChartGenerationService } from './../../shared/chart.generation.service';
import { Options, ScaleProperties } from './../../shared/model/option.model';
import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-stack',
  templateUrl: './stack.component.html',
  styleUrls: ['./stack.component.scss']
})
export class StackComponent implements OnInit {

  data: [];
  options: Options;
  constructor( private chartGenerationService: ChartGenerationService) { }

  ngOnInit(): void {
    d3.json('/assets/data/sales-stack.json').then((data) => {
      this.options = {
       width: 1200,
       height: 520,
       margin : {top: 20, right: 20, bottom: 40, left: 50},
       backgroundColor: '',
       responsive: true,
       xAxis : {padding: 0.2}
     };
      // tslint:disable-next-line:no-string-literal
      this.drawChart('stack', data['sales'], data['colors'], this.options);
    });
   }
   drawChart(id, data, colors: [], options: Options): void{
    const selectorSvg = this.chartGenerationService.buildSvg(id, options);
    const width = options.width - options.margin.left - options.margin.right;
    const height = options.height - options.margin.top - options.margin.bottom;

    // Transpose the data into layers
    const stack = d3.stack().keys(['shampoo', 'BodyWash', 'Ointment', 'Hair Gel']);
    const stackSeries = stack(data);
    const max = d3.max(stackSeries[stackSeries.length - 1], (d) => d[1]);
    const xAxisOptions: ScaleProperties = {
                           domain : data.map((d) =>  d.year),
                           range: [0, width],
                           padding: options.xAxis.padding
                         };
    const yAxisOptions: ScaleProperties = {
        // tslint:disable-next-line:no-string-literal
                                 domain : [0, max],
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

    const sel = chartContainer
    .selectAll('g.series')
    .data(stackSeries)
    .enter()
    .append('g')
    .classed('series', true)
    .style('fill', (d, i) => colors[i]);

    sel.selectAll('rect')
    .data((d) => d)
    .enter()
    .append('rect')
    .attr('width', xAxis.bandwidth())
    .attr('y', (d) => yAxis(d[1]))
    .attr('x', (d) => xAxis(d.data.year))
    .attr('height', (d) => yAxis(d[0]) -  yAxis(d[1]));
  }

}
