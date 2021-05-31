import { UserState, UserStateService, User } from './user-state.service';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'fp-rx';
  userState$: Observable<UserState>;
  username$: Observable<string>;
  users$: Observable<User[]>;
  pendingLogin$: Observable<boolean>;
  constructor(private userStateService: UserStateService){
    this.username$ = this.userStateService.username$;
    this.userState$ = this.userStateService.userStore$;
    this.pendingLogin$ = this.userStateService.pendingLogin$;
    this.userStateService.users$.subscribe(v => console.log(v));
  }

  login() {
    this.userStateService.logIn();
  }

  logout() {
    this.userStateService.logOut();
  }
}
