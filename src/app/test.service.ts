import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TestService {

  constructor(private http: HttpClient) { }

  getUsers(query: string) {
    console.log('query: ' + query);
    return this.http.get<any>('/api/users');
  }
  getCountries(query: string) {
    console.log('query: ' + query);
    return this.http.get<any>('/api/countries');
  }
}
