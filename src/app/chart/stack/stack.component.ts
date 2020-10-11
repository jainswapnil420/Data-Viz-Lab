import { InteractionService } from './../../shared/service/interaction.service';
import { ChartGenerationService } from '../../shared/service/chart.generation.service';
import { Options, ScaleProperties } from './../../shared/model/option.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import * as d3 from 'd3';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-stack',
  templateUrl: './stack.component.html',
  styleUrls: ['./stack.component.scss']
})
export class StackComponent implements OnInit, OnDestroy {

  data: [];
  legendData = [];
  options: Options;
  hideOrShowXGridSubs: Subscription;
  hideOrShowYGridSubs: Subscription;
  enableXAxisSubs: Subscription;
  enableYAxisSubs: Subscription;
  constructor( private chartGenerationService: ChartGenerationService,
               private interactionService: InteractionService) { }
  ngOnInit(): void {
    d3.json('/assets/data/sales-stack.json').then((data) => {
      this.options = {
       width: 1300,
       height: 460,
       margin : {top: 20, right: 20, bottom: 20, left: 50},
       backgroundColor: '',
       responsive: true,
       xAxis : {padding: 0.2}
     };
      // tslint:disable-next-line:no-string-literal
      const keyGroupElements = [{key: 'AUDI', status: true, color: data['colors'][0]},
      // tslint:disable-next-line: no-string-literal
      {key: 'BMW', status: true, color: data['colors'][1]},
      // tslint:disable-next-line:no-string-literal
      {key: 'Ferrari', status: true, color: data['colors'][2]},
      // tslint:disable-next-line:no-string-literal
      {key: 'Mercedez', status: false, color: data['colors'][3]}];

      this.drawChart('stack', data['data'], data['colors'], keyGroupElements, this.options);
    });
    this.interactionHandler();
    this.interactionService.enableLegend.next(true);
   }
   ngOnDestroy(): void{
    if (this.hideOrShowXGridSubs) { this.hideOrShowXGridSubs.unsubscribe(); }
    if (this.hideOrShowYGridSubs) { this.hideOrShowYGridSubs.unsubscribe(); }
    if (this.enableXAxisSubs) { this.enableXAxisSubs.unsubscribe(); }
    if (this.enableYAxisSubs) { this.enableYAxisSubs.unsubscribe(); }
  }
   drawChart(id, data, colors: [],keyGroupElements, options: Options): void{
    const selectorSvg = this.chartGenerationService.buildSvg(id, options);
    const width = options.width - options.margin.left - options.margin.right;
    const height = options.height - options.margin.top - options.margin.bottom;

    // Transpose the data into layers
    const filterOnStatus = keyGroupElements.filter((d) => d.status);
    const keyGroup = [];
    filterOnStatus.forEach(d => keyGroup.push(d.key));
    const stack = d3.stack().keys(keyGroup);
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
    const colorOptions: ScaleProperties = {
                                // tslint:disable-next-line:no-string-literal
                                                         domain : keyGroup,
                                                         range: colors
                                                       };
    const colorScale = this.chartGenerationService.computeOrdinalScale(colorOptions);
                              // Building data for legend
    keyGroup.forEach((d, i) => {
      let status = keyGroupElements.find((e)=> e.key==d);
      this.legendData.push({id: i, name: d, color: colorScale(d), isMarked: true});
    });

    const xAxis = this.chartGenerationService.computeBandScale(xAxisOptions);
    const yAxis = this.chartGenerationService.computeLinearScale(yAxisOptions);

    // Added X-Axis
    const xAxisCall = d3.axisBottom(xAxis);
    const yAxisCall = d3.axisLeft(yAxis).ticks(5);

    // Add grid lines
    const xGridBuilder = selectorSvg.append('g').classed('x-grid grid', true);
    const yGridBuilder = selectorSvg.append('g').classed('y-grid grid', true);

    xGridBuilder.attr('transform', 'translate(0,' + height + ')').call(xAxisCall.ticks(5).tickSize(-height));
    yGridBuilder.call(yAxisCall.tickSize(-width));

    selectorSvg.attr('transform', 'translate(' + options.margin.left + ',' + options.margin.top + ')');

    const chartContainer = selectorSvg.append('g').classed('chart-container', true);
    const sel = chartContainer
    .selectAll('g.series')
    .data(stackSeries)
    .enter()
    .append('g')
    .classed('series', true)
    .style('fill', (d, i) => colorScale(d.key));

    sel.selectAll('rect')
    .data((d) => d)
    .enter()
    .append('rect')
    .attr('width', xAxis.bandwidth())
    .attr('y', (d) => yAxis(d[1]))
    .attr('x', (d) => xAxis(d.data.year))
    .attr('height', (d) => yAxis(d[0]) -  yAxis(d[1]));
  }
  interactionHandler(): void{
    // Handle hide or show x grid
   this.hideOrShowXGridSubs = this.interactionService.hideOrShowXGrid.subscribe(res => {
     if (res){
       d3.selectAll('.x-grid .tick > line').classed('display-none', false);
     }else{
       d3.selectAll('.x-grid .tick > line').classed('display-none', true);
     }
   });
   // Handle hide or show y grid
   this.hideOrShowYGridSubs = this.interactionService.hideOrShowYGrid.subscribe(res => {
     if (res){
       d3.selectAll('.y-grid .tick > line').classed('display-none', false);
     }else{
       d3.selectAll('.y-grid .tick > line').classed('display-none', true);
     }
   });
   // Handle hide or show X Axis
   this.enableXAxisSubs = this.interactionService.hideOrShowXAxisLine.subscribe(res => {
     if (res){
       d3.selectAll('.x-grid path').classed('display-none', false);
       d3.selectAll('.x-grid .tick > text').classed('display-none', false);
     }else{
       d3.selectAll('.x-grid path').classed('display-none', true);
       d3.selectAll('.x-grid .tick > text').classed('display-none', true);
     }
   });
   // Handle hide or show Y Axis
   this.enableYAxisSubs = this.interactionService.hideOrShowYAxisLine.subscribe(res => {
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
