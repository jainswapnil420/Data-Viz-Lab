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
        this.featureDisabled = ( event.url === '/pie' || event.url === '/donut' || event.url === '/about'|| event.url === '/contact');
    }
    });

    this.interactionService.enableLegend.subscribe(res => {
      this.isLegendEnabled = res;
    });
  }

  hideOrShowXGrid(event): void{
    this.interactionService.hideOrShowXGrid.next(event.target.checked);
  }
  hideOrShowYGrid(event): void{
    this.interactionService.hideOrShowYGrid.next(event.target.checked);
  }

  hideOrShowXAxisLine(event): void{
    this.interactionService.hideOrShowXAxisLine.next(event.target.checked);
  }
  hideOrShowYAxisLine(event): void{
    this.interactionService.hideOrShowYAxisLine.next(event.target.checked);
  }
  hideOrShowLegend(event): void{
    this.interactionService.hideOrShowLegend.next(event.target.checked);
  }

}
