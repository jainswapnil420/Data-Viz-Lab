import { Options, ScaleProperties } from './model/option.model';
import * as d3 from 'd3';

export class ChartGenerationService{


buildSvg(elementID, options: Options): any{
     const svg =  d3.select('#' + elementID).append('svg');
     let element = null;
     if (options.responsive){
        element = svg.attr('viewBox', '0 0 ' + options.width + ' ' + options.height)
        .append('g');
     }else{
        element = svg.attr('width', options.width).attr('height', options.height).style('background', options.backgroundColor)
         .append('g');
     }
     return element;
}
 computeBandScale(axisOptions: ScaleProperties): any{
     return d3.scaleBand()
     .range(axisOptions.range)
     .domain(axisOptions.domain)
     .padding(axisOptions.padding);
 }
 computeLinearScale(axisOptions: ScaleProperties): any{
    return d3.scaleLinear()
    .range(axisOptions.range)
    .domain(axisOptions.domain);
  }
  computePointScale(axisOptions: ScaleProperties): any{
    return d3.scalePoint()
    .range(axisOptions.range)
    .domain(axisOptions.domain)
    .padding(axisOptions.padding);
}
}
