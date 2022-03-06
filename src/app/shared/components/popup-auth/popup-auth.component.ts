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
    this.auth.authTwostep(this.data.from, this.authCode).then((value) => {
      console.log(value);
    });
    // if (await this.auth.authTwostep(this.data.from, this.authCode)) {
    //   console.log('true');
    // } else {
    //   console.log('false');
    // }
  }
}
