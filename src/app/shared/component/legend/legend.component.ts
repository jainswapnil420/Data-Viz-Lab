import { InteractionService } from 'src/app/shared/service/interaction.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-legend',
  templateUrl: './legend.component.html',
  styleUrls: ['./legend.component.scss']
})
export class LegendComponent implements OnInit, OnDestroy{
dataset: [];
isCheckBoxEnable: boolean;
enableLegendSub: Subscription;
legendDataSub: Subscription;
constructor(private interactionService: InteractionService){}

ngOnInit(): void {
this.enableLegendSub = this.interactionService.enableLegendCheckbox.subscribe((res: boolean) => {
  this.isCheckBoxEnable = res;
});
this.legendDataSub = this.interactionService.legendData.subscribe(res => this.dataset = res);
}
ngOnDestroy(): void{
if (this.enableLegendSub) { this.enableLegendSub.unsubscribe(); }
if (this.legendDataSub) { this.legendDataSub.unsubscribe(); }
}
updateChart(event, item): void{
  item.status =  event.target.checked;
  // tslint:disable-next-line:no-string-literal
  const updatedData =  this.dataset.map(x => (x['id'] === item.id) ? item : x);
  this.interactionService.legendData.next(updatedData);
  }
}
