import { Options, ScaleProperties } from './../../shared/model/option.model';
import { ChartGenerationService } from './../../shared/chart.generation.service';
import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-scatter-with-shapes',
  templateUrl: './scatter-with-shapes.component.html',
  styleUrls: ['./scatter-with-shapes.component.scss']
})
export class ScatterWithShapesComponent implements OnInit {
  data: [];
  options: Options;
  constructor( private chartGenerationService: ChartGenerationService) { }

  ngOnInit(): void {
    d3.json('/assets/data/scatter-shapes.json').then((data) => {
      this.options = {
       width: 1200,
       height: 520,
       margin : {top: 20, right: 20, bottom: 40, left: 50},
       backgroundColor: '',
       responsive: true,
       xAxis : {padding: 0.1}
     };
      // tslint:disable-next-line:no-string-literal
      this.drawChart('scatter-shapes', data['data'], data['colors'], this.options);
    });
   }



drawChart(id, data, colors: [], options: Options): void{
  const selectorSvg = this.chartGenerationService.buildSvg(id, options);
  const width = options.width - options.margin.left - options.margin.right;
  const height = options.height - options.margin.top - options.margin.bottom;
  const xAxisOptions: ScaleProperties = {
                         // tslint:disable-next-line:no-string-literal
                         domain : [0, d3.max(data, (d) => +d['x']) + 2],
                         range: [0, width]
                       };
  const yAxisOptions: ScaleProperties = {
      // tslint:disable-next-line:no-string-literal
                               domain : [0, d3.max(data, (d) => +d['y'])],
                               range: [height, 0]
                             };

  const xAxis = this.chartGenerationService.computeLinearScale(xAxisOptions);
  const yAxis = this.chartGenerationService.computeLinearScale(yAxisOptions);

  const colorOptions: ScaleProperties = {
    // tslint:disable-next-line:no-string-literal
                             domain : data.map(d => d.category),
                             range: colors
                           };
  const shapeOptions: ScaleProperties = {
                            // tslint:disable-next-line:no-string-literal
                                                     domain : data.map(d => d.category),
                                                     range: d3.symbols.map(s => d3.symbol().type(s)())
                                                   };

  const colorScale = this.chartGenerationService.computeOrdinalScale(colorOptions);
  const shapeScale = this.chartGenerationService.computeOrdinalScale(shapeOptions);


  selectorSvg.attr('transform', 'translate(' + options.margin.left + ',' + options.margin.top + ')');
   // add the x Axis
  selectorSvg.append('g')
             .classed('x-axis', true)
             .attr('transform', 'translate(0,' + height + ')')
             .call(d3.axisBottom(xAxis));

  selectorSvg.append('g').classed('y-axis', true).call(d3.axisLeft(yAxis));

  const chartContainer = selectorSvg.append('g').classed('chart-container', true);

  chartContainer.append('g')
      .attr('stroke-width', 1.5)
      .attr('font-family', 'sans-serif')
      .attr('font-size', 10)
    .selectAll('path')
    .data(data)
    .join('path')
      .attr('transform', d => `translate(${xAxis(d.x)},${yAxis(d.y)})`)
      .attr('fill', d => colorScale(d.category))
      .attr('d', d => shapeScale(d.category));
 }

}
