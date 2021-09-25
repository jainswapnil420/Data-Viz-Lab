import { Options, ScaleProperties } from './../../shared/model/option.model';
import { ChartGenerationService } from '../../shared/service/chart.generation.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import * as d3 from 'd3';
import { Subscription } from 'rxjs';
import { InteractionService } from 'src/app/shared/service/interaction.service';

@Component({
  selector: 'app-horizontal-bar',
  templateUrl: './horizontal-bar.component.html',
  styleUrls: ['./horizontal-bar.component.scss'],
})
export class HorizontalBarComponent implements OnInit, OnDestroy {
  data: [];
  options: Options;
  hideOrShowXGridSubs: Subscription;
  hideOrShowYGridSubs: Subscription;
  enableXAxisSubs: Subscription;
  enableYAxisSubs: Subscription;
  constructor(
    private chartGenerationService: ChartGenerationService,
    private interactionService: InteractionService
  ) {}

  ngOnInit(): void {
    d3.json('/assets/data/employee.json').then((data) => {
      this.options = {
        width: 1300,
        height: 460,
        margin: { top: 10, right: 20, bottom: 20, left: 50 },
        backgroundColor: '',
        responsive: true,
        xAxis: { padding: 0.1 },
      };
      // tslint:disable-next-line:no-string-literal
      this.drawChart('horizontal-bar', data['data'], this.options);
    });
    this.interactionHandler();
  }
  ngOnDestroy(): void {
    if (this.hideOrShowXGridSubs) {
      this.hideOrShowXGridSubs.unsubscribe();
    }
    if (this.hideOrShowYGridSubs) {
      this.hideOrShowYGridSubs.unsubscribe();
    }
    if (this.enableXAxisSubs) {
      this.enableXAxisSubs.unsubscribe();
    }
    if (this.enableYAxisSubs) {
      this.enableYAxisSubs.unsubscribe();
    }
  }

  drawChart(id, data, options: Options): void {
    const selectorSvg = this.chartGenerationService.buildSvg(id, options);
    const width = options.width - options.margin.left - options.margin.right;
    const height = options.height - options.margin.top - options.margin.bottom;
    const xAxisOptions: ScaleProperties = {
      // tslint:disable-next-line:no-string-literal
      domain: [0, d3.max(data, (d) => +d['salary']) * 1.05],
      range: [0, width],
    };
    const yAxisOptions: ScaleProperties = {
      domain: data.map((d) => d.name),
      range: [0, height],
      padding: 0.1,
    };

    const xAxis = this.chartGenerationService.computeLinearScale(xAxisOptions);
    const yAxis = this.chartGenerationService.computeBandScale(yAxisOptions);

    // Added X-Axis
    const xAxisCall = d3.axisBottom(xAxis);
    const yAxisCall = d3.axisLeft(yAxis).ticks(5);

    // Add grid lines
    const xGridBuilder = selectorSvg.append('g').classed('x-grid grid', true);
    const yGridBuilder = selectorSvg.append('g').classed('y-grid grid', true);

    xGridBuilder
      .attr('transform', 'translate(0,' + height + ')')
      .call(xAxisCall.ticks(5).tickSize(-height));
    yGridBuilder.call(yAxisCall.tickSize(-width));

    selectorSvg.attr(
      'transform',
      'translate(' + options.margin.left + ',' + options.margin.top + ')'
    );

    const chartContainer = selectorSvg
      .append('g')
      .classed('chart-container', true);

    chartContainer
      .selectAll('.bar')
      .data(data)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      // tslint:disable-next-line:no-string-literal
      .attr('height', yAxis.bandwidth())
      // tslint:disable-next-line:no-string-literal
      .attr('y', (d) => yAxis(d['name']))
      // tslint:disable-next-line:no-string-literal
      .attr('width', 0)
      .transition()
      .duration(2000)
      .attr('width', (d) => xAxis(d.salary) - xAxis(0));
  }
  interactionHandler(): void {
    // Handle hide or show x grid
    this.hideOrShowXGridSubs = this.interactionService.hideXGrid.subscribe(
      (res) =>
        d3.selectAll('.x-grid .tick > line').classed('display-none', !res)
    );
    // Handle hide or show y grid
    this.hideOrShowYGridSubs = this.interactionService.hideYGrid.subscribe(
      (res) => {
        d3.selectAll('.y-grid .tick > line').classed('display-none', !res);
      }
    );
    // Handle hide or show X Axis
    this.enableXAxisSubs = this.interactionService.hideXAxisLine.subscribe(
      (res) => {
        d3.selectAll('.x-grid path').classed('display-none', !res);
        d3.selectAll('.x-grid .tick > text').classed('display-none', !res);
      }
    );
    // Handle hide or show Y Axis
    this.enableYAxisSubs = this.interactionService.hideYAxisLine.subscribe(
      (res) => {
        d3.selectAll('.y-grid path').classed('display-none', !res);
        d3.selectAll('.y-grid .tick > text').classed('display-none', !res);
      }
    );
  }
}
