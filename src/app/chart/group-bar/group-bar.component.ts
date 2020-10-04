import { ChartGenerationService } from './../../shared/chart.generation.service';
import { Options, ScaleProperties } from './../../shared/model/option.model';
import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-group-bar',
  templateUrl: './group-bar.component.html',
  styleUrls: ['./group-bar.component.scss']
})
export class GroupBarComponent implements OnInit {


  data: [];
  options: Options;
  constructor( private chartGenerationService: ChartGenerationService) { }

  ngOnInit(): void {
    d3.json('/assets/data/group-bar.json').then((data) => {
      this.options = {
       width: 1200,
       height: 520,
       margin : {top: 20, right: 20, bottom: 40, left: 50},
       backgroundColor: '',
       responsive: true,
       xAxis : {padding: 0.05}
     };
      // tslint:disable-next-line:no-string-literal
      this.drawChart('group-bar', data['groupData'], data['colors'], this.options);
    });
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

    console.log(x0Axis.bandwidth());
    // tslint:disable-next-line:no-string-literal
    const rateNames = data[0].values.map((d) => d['grpName']);

    const x1AxisOptions: ScaleProperties = {
                      domain : rateNames,
                      range: [0, x0Axis.bandwidth()],
                      padding: 0
                    };

    const x1Axis = this.chartGenerationService.computeBandScale(x1AxisOptions);
    selectorSvg.attr('transform', 'translate(' + options.margin.left + ',' + options.margin.top + ')');
     // add the x Axis
    selectorSvg.append('g')
               .classed('x-axis', true)
               .attr('transform', 'translate(0,' + height + ')')
               .call(d3.axisBottom(x0Axis));

    selectorSvg.append('g').classed('y-axis', true).call(d3.axisLeft(yAxis));

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
}
