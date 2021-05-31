import { TestService } from './../test.service';
import { debug } from './../utils/debug';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { forkJoin, fromEvent, Observable, of } from 'rxjs';
import { concatMap, debounceTime, distinctUntilChanged, exhaustMap, filter, map, mergeMap, startWith, switchMap, take } from 'rxjs/operators';

@Component({
  selector: 'app-observables',
  templateUrl: './observables.component.html',
  styleUrls: ['./observables.component.scss']
})
export class ObservablesComponent implements OnInit {

  @ViewChild('search', { static: true }) searchInput: ElementRef<HTMLInputElement>

  vals: any;
  obs$: Observable<number> = of(5, 2, 3, 4)
  constructor(private testService: TestService) { }

  ngOnInit(): void {
    this.obs$.pipe(
      take(1),
      map(val => val * 2),
      filter(val => val > 2),
      debug('MY VALUE'),
    ).subscribe(v => console.log(v));

    fromEvent(this.searchInput.nativeElement, 'input').pipe(
      startWith(''),
      distinctUntilChanged(),
      mergeMap((e: any) => this.testService.getUsers(e.target?.value))
    ).subscribe(v => {
      console.log(v);
      this.vals = v;
    })

    forkJoin( [this.testService.getUsers(''),  this.testService.getCountries('')]).subscribe(
      v => console.log(v)
    )
  }

}

export function myMap(myMappingFun: (value: any) =>  any) {
  return (source: any) => new Observable(obs => {
    return source.subscribe((val: any) => obs.next(myMappingFun(val)))
  })
}
