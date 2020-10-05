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
  constructor(private router: Router, private interactionService: InteractionService) { }

  ngOnInit(): void {
    this.router.events.subscribe((event: NavigationEnd ) => {
      if (event instanceof NavigationEnd) {
        this.isRoot = (event.url === '/' || event.url === undefined);
        this.featureDisabled = ( event.url === '/pie' || event.url === '/donut' || event.url === '/about');
    }
    });

  }

  hideOrShowXGrid(event): void{
    this.interactionService.enableXGrid.next(event.target.checked);
  }
  hideOrShowYGrid(event): void{
    this.interactionService.enableYGrid.next(event.target.checked);
  }

  hideOrShowXAxisLine(event): void{
    this.interactionService.enableXAxisLine.next(event.target.checked);
  }
  hideOrShowYAxisLine(event): void{
    this.interactionService.enableYAxisLine.next(event.target.checked);
  }

}
