import { debug } from './../utils/debug';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { fromEvent, Observable, of } from 'rxjs';
import { filter, map, take } from 'rxjs/operators';

@Component({
  selector: 'app-observables',
  templateUrl: './observables.component.html',
  styleUrls: ['./observables.component.scss']
})
export class ObservablesComponent implements OnInit {

  @ViewChild('search', { static: true }) searchInput: ElementRef<HTMLInputElement>

  obs$: Observable<number> = of(5, 2, 3, 4)
  constructor() { }

  ngOnInit(): void {
    this.obs$.pipe(
      take(1),
      map(val => val * 2),
      filter(val => val > 2),
      debug('MY VALUE'),
    ).subscribe(v => console.log(v));

    fromEvent(this.searchInput.nativeElement, 'input').subscribe(v => console.log(v))
  }

}

export function myMap(myMappingFun: (value: any) =>  any) {
  return (source: any) => new Observable(obs => {
    return source.subscribe((val: any) => obs.next(myMappingFun(val)))
  })
}
