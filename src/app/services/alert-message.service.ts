import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";
import { Alert } from '../interfaces/Alert';

@Injectable({
  providedIn: 'root'
})
export class AlertMessageService {
  private alertShowEventSource = new BehaviorSubject({});
  public alertShowEventObservableSubject = this.alertShowEventSource.asObservable();
  
  constructor() { }

  emitShowAlert(value: Alert) {
    this.alertShowEventSource.next(value);
  }
}
