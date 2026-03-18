import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { LoginCreds, RegisterCreds, User } from '../models/user';
import { tap } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private http = inject(HttpClient);
  baseUrl = environment.apiUrl;
  currentUser = signal<User | null>(null);

  constructor() {
    // const userString = localStorage.getItem('user');
    // if (userString) {
    //   this.currentUser.set(JSON.parse(userString));
    // }
  }

  login(cred: LoginCreds) {
    return this.http.post<User>(this.baseUrl + 'account/login', cred).pipe(
      tap(user => this.setSession(user))
    );
  }

  register(model: RegisterCreds) {
    return this.http.post<User>(this.baseUrl + 'account/register', model).pipe(
      tap(user => this.setSession(user))
    );
  }

  logout() {
    localStorage.removeItem('user');
    this.currentUser.set(null);
  }

  private setSession(user: User) {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
      this.currentUser.set(user);
    }
  }
}
