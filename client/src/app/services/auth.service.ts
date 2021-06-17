import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AUTH_TOKEN_LOCAL_STORAGE_KEY } from '../models/auth.model';
import { User } from '../models/user.model';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private apiSvc: ApiService) {
  }

  saveToken(token: string): void {
    localStorage.setItem(AUTH_TOKEN_LOCAL_STORAGE_KEY, token);
  }

  getToken(): string {
    return localStorage.getItem(AUTH_TOKEN_LOCAL_STORAGE_KEY);
  }

  removeToken() {
    localStorage.removeItem(AUTH_TOKEN_LOCAL_STORAGE_KEY);
  }

  isAuthenticated(): Observable<boolean> {
    return of(this.getToken() !== null);
  }

  getCurrentUser(): Observable<User> {
    return this.apiSvc.get('api/authentication/current');
  }
}
