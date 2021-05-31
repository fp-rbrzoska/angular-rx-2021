import { distinctUntilChanged, map } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface User {
  name: string;
  id?: string;
  isAdmin: boolean;
}

export interface UserState {
  name: string;
  isAdmin: boolean;
  pendingLogin: boolean;
  pendingUsers: boolean;
  users: User[];
}

@Injectable({
  providedIn: 'root'
})
export class UserStateService {

  private userStore = new BehaviorSubject<UserState>({
    isAdmin: false,
    name: null,
    pendingLogin: false,
    pendingUsers: false,
    users: null
  })

  userStore$ = this.userStore.asObservable();
  username$ = this.userStore$.pipe(map(u => u.name), distinctUntilChanged());
  isAdmin$ = this.userStore$.pipe(map(u => u.isAdmin), distinctUntilChanged());
  users$ = this.userStore$.pipe(map(u => u.users), distinctUntilChanged());
  pendingLogin$ = this.userStore$.pipe(map(u => u.pendingLogin), distinctUntilChanged());
  private history: {action: string, state: UserState}[] = [{ action: 'APP_INIT', state: this.userStore.value }];

  constructor(private http: HttpClient, private auth: AuthService) { }

  logIn() {
    this.setState({pendingLogin: true}, '[User] LOGIN');
    this.auth.login().subscribe(user => {
      console
      this.setState({ pendingLogin: false, ...user }, '[User] LOGIN_SUCCESS');
    })
  }

  logOut() {
    this.setState({
      name: null,
      isAdmin: false,
    }, '[User] LOGOUT')
  }

  private setState(state: Partial<UserState>, actionName: string) {
    const currentState = this.userStore.value;
    const newState = {...currentState, ...state };
    this.userStore.next(newState);
    this.history.push({ action: actionName, state: newState});
    console.log(this.history);
  }
}
