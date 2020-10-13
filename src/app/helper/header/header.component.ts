import { InteractionService } from './../../shared/service/interaction.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isRoot: boolean;
  featureDisabled: boolean;
  isLegendEnabled: boolean;
  constructor(private router: Router, private interactionService: InteractionService) { }

  ngOnInit(): void {
    this.router.events.subscribe((event: NavigationEnd ) => {
      if (event instanceof NavigationEnd) {
        this.isRoot = (event.url === '/' || event.url === undefined);
        this.featureDisabled = ( event.url === '/pie' || event.url === '/donut' || event.url === '/about' || event.url === '/contact');
    }
    });

    this.interactionService.enableLegend.subscribe(res => {
      this.isLegendEnabled = res;
    });
  }

  hideXGrid(event): void{
    this.interactionService.hideXGrid.next(event.target.checked);
  }
  hideYGrid(event): void{
    this.interactionService.hideYGrid.next(event.target.checked);
  }

  hideXAxisLine(event): void{
    this.interactionService.hideXAxisLine.next(event.target.checked);
  }
  hideYAxisLine(event): void{
    this.interactionService.hideYAxisLine.next(event.target.checked);
  }
  hideLegend(event): void{
    this.interactionService.hideLegend.next(event.target.checked);
  }

}
