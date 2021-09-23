import { Component, OnInit } from '@angular/core';
import { InteractionService } from 'src/app/shared/service/interaction.service';

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.scss'],
})
export class SidemenuComponent implements OnInit {
  isLegendEnabled: boolean;
  constructor(private interactionService: InteractionService) {}

  ngOnInit(): void {
      this.interactionService.enableLegend.subscribe((res) => {
        this.isLegendEnabled = res;
      });
  }

  hideXGrid(event): void {
    this.interactionService.hideXGrid.next(event.target.checked);
  }
  hideYGrid(event): void {
    this.interactionService.hideYGrid.next(event.target.checked);
  }

  hideXAxisLine(event): void {
    this.interactionService.hideXAxisLine.next(event.target.checked);
  }
  hideYAxisLine(event): void {
    this.interactionService.hideYAxisLine.next(event.target.checked);
  }
  hideLegend(event): void {
    this.interactionService.hideLegend.next(!event.target.checked);
  }
}
