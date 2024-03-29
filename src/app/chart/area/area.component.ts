import { LegendData } from './../../shared/model/legend.model';
import { ChartGenerationService } from '../../shared/service/chart.generation.service';
import { Options, ScaleProperties } from './../../shared/model/option.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import * as d3 from 'd3';
import { Subscription } from 'rxjs';
import { InteractionService } from 'src/app/shared/service/interaction.service';

@Component({
  selector: 'app-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.scss'],
})
export class AreaComponent implements OnInit, OnDestroy {
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
    d3.json('/assets/data/product-area.json').then((data) => {
      this.options = {
        width: 1300,
        height: 460,
        margin: { top: 10, right: 20, bottom: 20, left: 50 },
        backgroundColor: '',
        responsive: true,
        xAxis: { padding: 0 },
      };
      // tslint:disable-next-line:no-string-literal
      this.data = data['data'];
      // tslint:disable-next-line:no-string-literal
      const legendDataArray = this.prepareLegendData(data['colors']);
      const chartData = [];
      legendDataArray.forEach((d) => {
        if (d.status) {
          // tslint:disable-next-line:no-string-literal
          chartData.push(...this.data.filter((e) => e['name'] === d['name']));
        }
      });
      // tslint:disable-next-line:no-string-literal
      this.drawChart('area', chartData, legendDataArray, this.options);
    });
    this.interactionHandler();
    this.interactionService.enableLegend.next(true);
    this.interactionService.enableLegendCheckbox.next(true);
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
  prepareLegendData(colors): LegendData[] {
    const products = Array.from(
      // tslint:disable-next-line:no-string-literal
      d3.group(this.data, (d) => d['name']),
      ([key, value]) => ({ key, value })
    );
    const legendData: LegendData[] = [];
    products.forEach((d, i) => {
      legendData.push({ id: i, name: d.key, status: true, color: colors[i] });
    });
    this.interactionService.legendData.next(legendData);
    return legendData;
  }
  drawChart(id, data, legendData: LegendData[], options: Options): void {
    d3.select('#' + id).html('');
    const selectorSvg = this.chartGenerationService.buildSvg(id, options);
    const width = options.width - options.margin.left - options.margin.right;
    const height = options.height - options.margin.top - options.margin.bottom;
    const xAxisOptions: ScaleProperties = {
      domain: data.map((d) => d.year),
      range: [0, width],
      padding: options.xAxis.padding,
    };
    const yAxisOptions: ScaleProperties = {
      // tslint:disable-next-line:no-string-literal
      domain: [0, d3.max(data, (d) => +d['sales'])],
      range: [height, 0],
    };

    const xAxis = this.chartGenerationService.computePointScale(xAxisOptions);
    const yAxis = this.chartGenerationService.computeLinearScale(yAxisOptions);
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
    // Add the line
    const area = (datum, flag) => {
      return (
        d3
          .area()
          // tslint:disable-next-line:no-string-literal
          .x((d) => xAxis(d['year']))
          .y0(yAxis(0))
          // tslint:disable-next-line:no-string-literal
          .y1((d) => (flag ? yAxis(d['sales']) : height))(datum)
      );
    };

    const products = Array.from(
      // tslint:disable-next-line:no-string-literal
      d3.group(data, (d) => d['name']),
      ([key, value]) => ({ key, value })
    );
    chartContainer
      .selectAll('line')
      .data(products)
      .enter()
      .append('g')
      .classed('area', true)
      .append('path')
      .datum((d) => d.value)
      .attr('fill', (d, i) => legendData[i].color)
      .attr('stroke', (d, i) => legendData[i].color)
      .attr('stroke-width', 1.5)
      .attr('d', (d) => area(d, false))
      .transition()
      .duration(2000)
      .attr('d', (d) => area(d, true));
  }
  interactionHandler(): void {
    // Handle hide or show x grid
    this.hideOrShowXGridSubs = this.interactionService.hideXGrid.subscribe(
      (res) => {
        if (res) {
          d3.selectAll('.x-grid .tick > line').classed('display-none', false);
        } else {
          d3.selectAll('.x-grid .tick > line').classed('display-none', true);
        }
      }
    );
    // Handle hide or show y grid
    this.hideOrShowYGridSubs = this.interactionService.hideYGrid.subscribe(
      (res) => {
        if (res) {
          d3.selectAll('.y-grid .tick > line').classed('display-none', false);
        } else {
          d3.selectAll('.y-grid .tick > line').classed('display-none', true);
        }
      }
    );
    // Handle hide or show X Axis
    this.enableXAxisSubs = this.interactionService.hideXAxisLine.subscribe(
      (res) => {
        if (res) {
          d3.selectAll('.x-grid path').classed('display-none', false);
          d3.selectAll('.x-grid .tick > text').classed('display-none', false);
        } else {
          d3.selectAll('.x-grid path').classed('display-none', true);
          d3.selectAll('.x-grid .tick > text').classed('display-none', true);
        }
      }
    );
    // Handle hide or show Y Axis
    this.enableYAxisSubs = this.interactionService.hideYAxisLine.subscribe(
      (res) => {
        if (res) {
          d3.selectAll('.y-grid path').classed('display-none', false);
          d3.selectAll('.y-grid .tick > text').classed('display-none', false);
        } else {
          d3.selectAll('.y-grid path').classed('display-none', true);
          d3.selectAll('.y-grid .tick > text').classed('display-none', true);
        }
      }
    );
  }
}
