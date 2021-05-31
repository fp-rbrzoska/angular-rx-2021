import { debug } from './../utils/debug';
import { NotificationsService } from './../notifications.service';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { AsyncSubject, BehaviorSubject, ReplaySubject, Subject } from 'rxjs';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SubjectsComponent implements OnInit {

  @Input() data;
  private subj = new Subject<number>();
  private bSubj = new BehaviorSubject<number>(0);
  private rSubj = new ReplaySubject<number>(1);
  private aSubj = new AsyncSubject<number>();

  constructor(private notifications: NotificationsService) { }

  ngOnInit(): void {
    this.subj.subscribe(v => console.log(v));
    this.subj.next(1);

    this.bSubj.next(2);
    this.bSubj.pipe(debug('BSubj')).subscribe()


    this.rSubj.next(1);

    this.rSubj.next(2);
    this.rSubj.pipe(debug('RSubj')).subscribe()

    this.aSubj.next(21);
    this.aSubj.next(22);
    this.aSubj.pipe(debug('ASubj')).subscribe()
    this.aSubj.next(23);
    this.aSubj.next(24);
    this.aSubj.error(2)
  }

  notify() {
    this.notifications.pushNotification('hallo');
  }

}
