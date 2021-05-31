import { Observable } from 'rxjs'
import { tap } from 'rxjs/operators'
export enum LogLevel {
  ALL,
  INFO
}
export const debug = (message: string, logLevel?: any) => {
  return (source: Observable<any>) => source.pipe(
    tap( val => {
      console.log(message + ': ', val)
    })
  )
}
