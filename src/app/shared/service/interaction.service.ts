import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InteractionService {

  enableXGrid = new Subject<boolean>();
  enableYGrid = new Subject<boolean>();
  enableXAxisLine = new Subject<boolean>();
  enableYAxisLine = new Subject<boolean>();
}
