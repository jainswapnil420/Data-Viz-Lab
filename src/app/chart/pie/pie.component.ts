import { ChartGenerationService } from '../../shared/service/chart.generation.service';
import { Options } from './../../shared/model/option.model';
import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-pie',
  templateUrl: './pie.component.html',
  styleUrls: ['./pie.component.scss'],
})
export class PieComponent implements OnInit {
  data: [];
  options: Options;
  constructor(private chartGenerationService: ChartGenerationService) {}

  ngOnInit(): void {
    d3.json('/assets/data/pie-data.json').then((data) => {
      this.options = {
        width: 1200,
        height: 470,
        margin: { top: 20, right: 20, bottom: 40, left: 50 },
        backgroundColor: '',
        responsive: true,
        xAxis: { padding: 0 },
      };
      // tslint:disable-next-line:no-string-literal
      this.drawChart('pie', data['products'], data['colors'], this.options);
    });
  }

  drawChart(id, data, colors: [], options: Options): void {
    const selectorSvg = this.chartGenerationService.buildSvg(id, options);
    const width = options.width - options.margin.left - options.margin.right;
    const height = options.height - options.margin.top - options.margin.bottom;
    const radius = Math.min(width, height) / 2;
    selectorSvg.attr(
      'transform',
      'translate(' + options.margin.left + ',' + options.margin.top + ')'
    );

    const pie = d3
      .pie()
      // tslint:disable-next-line:no-string-literal
      .value((d) => d['sales'])
      .sort(null);

    const arc = (datum, flag) => {
      return d3
        .arc()
        .innerRadius(0)
        .outerRadius((d) => (flag ? radius : 0))(datum);
    };

    const chartContainer = selectorSvg
      .append('g')
      .classed('chart-container', true)
      .attr('transform', 'translate(' + radius + ',' + radius + ')');

    const path = chartContainer.selectAll('path').data(pie(data));

    // Enter new arcs
    path
      .enter()
      .append('path')
      .attr('fill', (d, i) => colors[i])
      .attr('d', (d) => arc(d, false))
      .transition()
      .delay((d, i) => 500 * i)
      .attr('d', (d) => arc(d, true))
      .attr('stroke', 'white')
      .attr('stroke-width', '6px');
  }
}
