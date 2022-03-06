import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'popup-auth',
  templateUrl: './popup-auth.component.html',
  styleUrls: ['./popup-auth.component.scss'],
})
export class PopupAuthComponent implements OnInit {
  authCode = '';

  ngOnInit() {}

  constructor(
    private auth: AuthService,
    public dialogRef: MatDialogRef<PopupAuthComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  async checkCode() {
    if (this.auth.authTwostep(this.data.from, this.authCode)) {
      this.dialogRef.close();
      // this.dialogRef.
    }
  }
}
