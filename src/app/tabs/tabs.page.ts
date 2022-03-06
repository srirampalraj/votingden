import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
})
export class TabsPage {
  constructor(private auth: AuthService, private router: Router) {
    // this.logoff();
  }

  logoff() {
    console.log('oiiopip');
    this.auth.SignOut();
  }

  goToAddUser() {
    this.router.navigate(['add-user']);
  }
}
