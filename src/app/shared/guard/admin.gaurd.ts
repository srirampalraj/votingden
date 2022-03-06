import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(public authService: AuthService, public router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this.authService.isLoggedIn === true) {
      console.table(this.authService.getUserMail);
      if (this.authService.getUserMail === 'admin@gmail.com') {
        return true;
      } else {
        this.router.navigate(['auth']);
      }
    } else {
      this.router.navigate(['auth']);
    }
  }
}
