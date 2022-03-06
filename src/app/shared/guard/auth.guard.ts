import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';
import { Observable } from 'rxjs';
import { ToastController } from '@ionic/angular';
@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    public authService: AuthService,
    public router: Router,
    // private _snackBar: MatSnackBar
    private toastController: ToastController
  ) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this.authService.isLoggedIn !== true) {
      this.router.navigate(['auth']);
    } else if (this.authService.getUserMail === 'admin@gmail.com') {
      this.presentToast();
      this.router.navigate(['admin']);
    }
    return true;
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'You are not authorized !',
      duration: 2000,
    });
    toast.present();
  }
}
