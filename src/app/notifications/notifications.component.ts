import { NotificationsService } from './../notifications.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit, OnDestroy {

  subscriptions = new Subscription();

  notifications$: Observable<string>;

  constructor(private notificationsService: NotificationsService) {
    this.subscriptions.add(
      notificationsService.notifications$.subscribe()
    )
    this.notifications$ = notificationsService.notifications$;
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe()
  }

}
