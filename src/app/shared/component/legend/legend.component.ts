import { LegendData } from './../../model/legend.model';
import { InteractionService } from 'src/app/shared/service/interaction.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-legend',
  templateUrl: './legend.component.html',
  styleUrls: ['./legend.component.scss']
})
export class LegendComponent implements OnInit, OnDestroy{
dataset: LegendData[];
isCheckBoxEnable: boolean;
isLegendEnabled: boolean;
enableLegendCheckboxSub: Subscription;
hideLegendSub: Subscription;
legendDataSub: Subscription;
constructor(private interactionService: InteractionService){}

ngOnInit(): void {
this.enableLegendCheckboxSub = this.interactionService.enableLegendCheckbox.subscribe((res: boolean) => {
  this.isCheckBoxEnable = res;
});
this.hideLegendSub = this.interactionService.hideLegend.subscribe(res => {
  this.isLegendEnabled = !res;
});
this.legendDataSub = this.interactionService.legendData.subscribe((res: LegendData[]) => this.dataset = res);
}
ngOnDestroy(): void{
if (this.enableLegendCheckboxSub) { this.enableLegendCheckboxSub.unsubscribe(); }
if (this.legendDataSub) { this.legendDataSub.unsubscribe(); }
if (this.hideLegendSub) { this.hideLegendSub.unsubscribe(); }
}
updateChart(event, item): void{
  item.status =  event.target.checked;
  // tslint:disable-next-line:no-string-literal
  const updatedData =  this.dataset.map(x => (x['id'] === item.id) ? item : x);
  this.interactionService.legendData.next(updatedData);
  }
}
