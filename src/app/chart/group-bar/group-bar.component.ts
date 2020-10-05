import { ChartGenerationService } from '../../shared/service/chart.generation.service';
import { Options, ScaleProperties } from './../../shared/model/option.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import * as d3 from 'd3';
import { Subscription } from 'rxjs';
import { InteractionService } from 'src/app/shared/service/interaction.service';

@Component({
  selector: 'app-group-bar',
  templateUrl: './group-bar.component.html',
  styleUrls: ['./group-bar.component.scss']
})
export class GroupBarComponent implements OnInit, OnDestroy {
  data: [];
  options: Options;
  enableXGridSubs: Subscription;
  enableYGridSubs: Subscription;
  enableXAxisSubs: Subscription;
  enableYAxisSubs: Subscription;
  constructor( private chartGenerationService: ChartGenerationService,
               private interactionService: InteractionService) { }

  ngOnInit(): void {
    d3.json('/assets/data/group-bar.json').then((data) => {
      this.options = {
        width: 1200,
       height: 440,
       margin : {top: 10, right: 20, bottom: 20, left: 50},
       backgroundColor: '',
       responsive: true,
       xAxis : {padding: 0.05}
     };
      // tslint:disable-next-line:no-string-literal
      this.drawChart('group-bar', data['groupData'], data['colors'], this.options);
    });
    this.interactionHandler();
  }
ngOnDestroy(): void{
 if (this.enableXGridSubs) { this.enableXGridSubs.unsubscribe(); }
 if (this.enableYGridSubs) { this.enableYGridSubs.unsubscribe(); }
 if (this.enableXAxisSubs) { this.enableXAxisSubs.unsubscribe(); }
 if (this.enableYAxisSubs) { this.enableYAxisSubs.unsubscribe(); }
}

   drawChart(id, data, colors: [], options: Options): void{
    const selectorSvg = this.chartGenerationService.buildSvg(id, options);
    const width = options.width - options.margin.left - options.margin.right;
    const height = options.height - options.margin.top - options.margin.bottom;
    // tslint:disable-next-line:no-string-literal
    const yMax = d3.max(data, (key) => d3.max(key['values'], (d) => d['grpValue']));
    const xAxisOptions: ScaleProperties = {
                           domain : data.map((d) =>  d.key),
                           range: [0, width],
                           padding: options.xAxis.padding
                         };
    const yAxisOptions: ScaleProperties = {
                                 domain : [0, yMax],
                                 range: [height, 0]
                               };

    const x0Axis = this.chartGenerationService.computeBandScale(xAxisOptions);
    const yAxis = this.chartGenerationService.computeLinearScale(yAxisOptions);

     // Added X-Axis
    const xAxisCall = d3.axisBottom(x0Axis);
    const yAxisCall = d3.axisLeft(yAxis).ticks(5);

  // Add grid lines
    const xGridBuilder = selectorSvg.append('g').classed('x-grid grid', true);
    const yGridBuilder = selectorSvg.append('g').classed('y-grid grid', true);

    xGridBuilder.attr('transform', 'translate(0,' + height + ')').call(xAxisCall.ticks(5).tickSize(-height));
    yGridBuilder.call(yAxisCall.tickSize(-width));

    // tslint:disable-next-line:no-string-literal
    const rateNames = data[0].values.map((d) => d['grpName']);

    const x1AxisOptions: ScaleProperties = {
                      domain : rateNames,
                      range: [0, x0Axis.bandwidth()],
                      padding: 0
                    };

    const x1Axis = this.chartGenerationService.computeBandScale(x1AxisOptions);
    selectorSvg.attr('transform', 'translate(' + options.margin.left + ',' + options.margin.top + ')');

    const chartContainer = selectorSvg.append('g').classed('chart-container', true);
    const slice = chartContainer.selectAll('.slice')
    .data(data)
    .enter().append('g')
    .attr('class', 'g')
    .attr('transform', (d) => 'translate(' + x0Axis(d.key) + ',0)');

    slice.selectAll('rect')
    .data((d) => d.values)
      .enter().append('rect')
          .attr('width', x1Axis.bandwidth())
          .attr('x', (d) => x1Axis(d.grpName))
          .style('fill', (d, i) => colors[i])
          .attr('y', (d) => yAxis(d.grpValue))
          .attr('height', (d) => height - yAxis(d.grpValue));

  }
  interactionHandler(): void{
    // Handle hide or show x grid
   this.enableXGridSubs = this.interactionService.enableXGrid.subscribe(res => {
     if (res){
       d3.selectAll('.x-grid .tick > line').classed('display-none', false);
     }else{
       d3.selectAll('.x-grid .tick > line').classed('display-none', true);
     }
   });
   // Handle hide or show y grid
   this.enableYGridSubs = this.interactionService.enableYGrid.subscribe(res => {
     if (res){
       d3.selectAll('.y-grid .tick > line').classed('display-none', false);
     }else{
       d3.selectAll('.y-grid .tick > line').classed('display-none', true);
     }
   });
   // Handle hide or show X Axis
   this.enableXAxisSubs = this.interactionService.enableXAxisLine.subscribe(res => {
     if (res){
       d3.selectAll('.x-grid path').classed('display-none', false);
       d3.selectAll('.x-grid .tick > text').classed('display-none', false);
     }else{
       d3.selectAll('.x-grid path').classed('display-none', true);
       d3.selectAll('.x-grid .tick > text').classed('display-none', true);
     }
   });
   // Handle hide or show Y Axis
   this.enableYAxisSubs = this.interactionService.enableYAxisLine.subscribe(res => {
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
