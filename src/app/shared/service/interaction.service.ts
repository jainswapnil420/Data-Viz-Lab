import { LegendData } from './../model/legend.model';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InteractionService {

  enableLegend = new BehaviorSubject(true);
  enableLegendCheckbox = new BehaviorSubject(false);
  hideLegend = new BehaviorSubject(false);
  hideXGrid = new BehaviorSubject(false);
  hideYGrid = new BehaviorSubject(false);
  hideXAxisLine = new BehaviorSubject(false);
  hideYAxisLine = new BehaviorSubject(false);

  legendData = new Subject<LegendData[]>();

 }
