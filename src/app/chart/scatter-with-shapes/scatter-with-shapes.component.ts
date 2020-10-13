import { InteractionService } from './../../shared/service/interaction.service';
import { Options, ScaleProperties } from './../../shared/model/option.model';
import { ChartGenerationService } from '../../shared/service/chart.generation.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import * as d3 from 'd3';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-scatter-with-shapes',
  templateUrl: './scatter-with-shapes.component.html',
  styleUrls: ['./scatter-with-shapes.component.scss']
})
export class ScatterWithShapesComponent implements OnInit, OnDestroy {
  data: [];
  options: Options;
  hideOrShowXGridSubs: Subscription;
  hideOrShowYGridSubs: Subscription;
  enableXAxisSubs: Subscription;
  enableYAxisSubs: Subscription;
  constructor( private chartGenerationService: ChartGenerationService,
               private interactionService: InteractionService) { }

  ngOnInit(): void {
    d3.json('/assets/data/scatter-shapes.json').then((data) => {
      this.options = {
        width: 1200,
        height: 440,
        margin : {top: 10, right: 20, bottom: 20, left: 50},
        backgroundColor: '',
       responsive: true,
       xAxis : {padding: 0.1}
     };
      // tslint:disable-next-line:no-string-literal
      this.drawChart('scatter-shapes', data['data'], data['colors'], this.options);
    });
    this.interactionHandler();
   }
ngOnDestroy(): void{
  if (this.hideOrShowXGridSubs) { this.hideOrShowXGridSubs.unsubscribe(); }
  if (this.hideOrShowYGridSubs) { this.hideOrShowYGridSubs.unsubscribe(); }
  if (this.enableXAxisSubs) { this.enableXAxisSubs.unsubscribe(); }
  if (this.enableYAxisSubs) { this.enableYAxisSubs.unsubscribe(); }
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

// Added X-Axis
  const xAxisCall = d3.axisBottom(xAxis).ticks(10);
  const yAxisCall = d3.axisLeft(yAxis).ticks(10);

// Add grid lines
  const xGridBuilder = selectorSvg.append('g').classed('x-grid grid', true);
  const yGridBuilder = selectorSvg.append('g').classed('y-grid grid', true);

  xGridBuilder.attr('transform', 'translate(0,' + height + ')').call(xAxisCall.tickSize(-height));
  yGridBuilder.call(yAxisCall.tickSize(-width));

  selectorSvg.attr('transform', 'translate(' + options.margin.left + ',' + options.margin.top + ')');

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

 interactionHandler(): void{
  // Handle hide or show x grid
 this.hideOrShowXGridSubs = this.interactionService.hideXGrid.subscribe(res => {
   if (res){
     d3.selectAll('.x-grid .tick > line').classed('display-none', false);
   }else{
     d3.selectAll('.x-grid .tick > line').classed('display-none', true);
   }
 });
 // Handle hide or show y grid
 this.hideOrShowYGridSubs = this.interactionService.hideYGrid.subscribe(res => {
   if (res){
     d3.selectAll('.y-grid .tick > line').classed('display-none', false);
   }else{
     d3.selectAll('.y-grid .tick > line').classed('display-none', true);
   }
 });
 // Handle hide or show X Axis
 this.enableXAxisSubs = this.interactionService.hideXAxisLine.subscribe(res => {
   if (res){
     d3.selectAll('.x-grid path').classed('display-none', false);
     d3.selectAll('.x-grid .tick > text').classed('display-none', false);
   }else{
     d3.selectAll('.x-grid path').classed('display-none', true);
     d3.selectAll('.x-grid .tick > text').classed('display-none', true);
   }
 });
 // Handle hide or show Y Axis
 this.enableYAxisSubs = this.interactionService.hideYAxisLine.subscribe(res => {
   if (res){
     d3.selectAll('.y-grid path').classed('display-none', false);
     d3.selectAll('.y-grid .tick > text').classed('display-none', false);
   }else{
     d3.selectAll('.y-grid path').classed('display-none', true);
     d3.selectAll('.y-grid .tick > text').classed('display-none', true);
   }
 });
}
}
