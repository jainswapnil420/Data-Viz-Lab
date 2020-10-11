import { Component, Input } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-legend',
  templateUrl: './legend.component.html',
  styleUrls: ['./legend.component.scss']
})
export class LegendComponent {
@Input() dataset: [];

  updateChart(event, item): void{
  console.log( this.dataset);
  console.log(item);
    d3.selectAll('#item' + item.id).classed('display-none', !event.target.checked);
  }
}
