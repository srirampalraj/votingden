import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';
import { PopupAuthComponent } from '../popup-auth/popup-auth.component';

@Component({
  selector: 'app-confirm-popup',
  templateUrl: './confirm-popup.component.html',
  styleUrls: ['./confirm-popup.component.scss'],
})
export class ConfirmPopupComponent implements OnInit {
  authCode = '';
  error = false;
  // toastController: any;

  ngOnInit() {}

  constructor(
    private auth: AuthService,
    private toastController: ToastController,
    public dialogRef: MatDialogRef<PopupAuthComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  async checkCode() {
    if (this.auth.authTwostep(this.data.from, this.authCode)) {
      this.dialogRef.close('success');
      this.presentToast('Auth success');
    } else {
      this.error = true;
      this.presentToast('Invalid Key');
    }
  }

  cancel() {
    this.dialogRef.close('closed');
  }

  async presentToast(mes) {
    const toast = await this.toastController.create({
      message: mes,
      duration: 3000,
    });
    toast.present();
  }
}
