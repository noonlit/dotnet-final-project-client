import { AuthService } from './../../services/auth.service';
import { AuthResponse } from './../../models/auth.model';
import { ApiService } from './../../services/api.service';
import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from 'src/app/models/login.model';

@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class LoginPage {
  loginData = new Login();
  constructor(
    private router: Router,
    private apiSvc: ApiService,
    private authSvc: AuthService
  ) {}
  logIn() {
    this.apiSvc
      .post('api/Authentication/login', this.loginData)
      .subscribe((response: AuthResponse) => {
        this.authSvc.saveToken(response.token);
        window.location.href = '/';
      });
  }
}
