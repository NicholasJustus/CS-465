
import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { BROWSER_STORAGE } from './storage';

import { User } from '../models/user';
import { AuthResponse } from '../models/auth-response';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private apiUrl = 'http://localhost:3000/api';
  private tokenKey = 'travlr-token';

  constructor(
    private http: HttpClient,
    @Inject(BROWSER_STORAGE) private storage: Storage
  ) {}

  public login(user: User): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(
      `${this.apiUrl}/login`,
      user
    ).pipe(
      tap(response => {
        if (response.token) {
          this.storage.setItem(this.tokenKey, response.token);
        }
      })
    );
  }

  public register(user: User): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(
      `${this.apiUrl}/register`,
      user
    ).pipe(
      tap(response => {
        if (response.token) {
          this.storage.setItem(this.tokenKey, response.token);
        }
      })
    );
  }

  public getToken(): string | null {
    return this.storage.getItem(this.tokenKey);
  }

  public isLoggedIn(): boolean {
    const token = this.getToken();

    if (!token) {
      return false;
    }

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp > Date.now() / 1000;
    } catch {
      return false;
    }
  }

  public logout(): void {
    this.storage.removeItem(this.tokenKey);
  }
}
