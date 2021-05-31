import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  private notificationsSubj = new Subject<string>();
  notifications$ = this.notificationsSubj.asObservable();

  constructor() { }

  pushNotification(message) {
    this.notificationsSubj.next(message);
  }
}
