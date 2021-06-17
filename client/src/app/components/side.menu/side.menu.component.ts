import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-side-menu',
  templateUrl: 'side.menu.component.html',
})
export class SideMenuComponent implements OnInit {
  isAuthenticated: Observable<boolean>;

  constructor(private navCtrl: NavController, private authSvc: AuthService) { }

  ngOnInit() {
    this.isAuthenticated = this.authSvc.isAuthenticated();
  }

  logOut() {
    this.authSvc.removeToken();
    window.location.href = '/';
  }
}
