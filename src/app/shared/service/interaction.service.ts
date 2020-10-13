import { LegendData } from './../model/legend.model';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InteractionService {

  enableLegend = new BehaviorSubject(true);
  enableLegendCheckbox = new BehaviorSubject(false);
  legendData = new Subject<LegendData[]>();

  hideOrShowXGrid = new Subject<boolean>();
  hideOrShowYGrid = new Subject<boolean>();
  hideOrShowXAxisLine = new Subject<boolean>();
  hideOrShowYAxisLine = new Subject<boolean>();
  hideOrShowLegend = new Subject<boolean>();
}
