import { InteractionService } from 'src/app/shared/service/interaction.service';
import { Component, Input, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-legend',
  templateUrl: './legend.component.html',
  styleUrls: ['./legend.component.scss']
})
export class LegendComponent implements OnInit{
@Input() dataset: [];
isCheckBoxEnable: boolean;
constructor(private interactionService: InteractionService){}

ngOnInit(): void {
this.interactionService.enableLegendCheckbox.subscribe((res: boolean) => {
  this.isCheckBoxEnable = res;
});
}
  updateChart(event, item): void{
  d3.selectAll('#item' + item.id).classed('display-none', !event.target.checked);
  }
}
