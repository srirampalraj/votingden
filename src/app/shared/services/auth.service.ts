import { HttpClient, HttpResponse } from '@angular/common/http';
import { Component, Injectable, Input } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Router } from '@angular/router';
import { error } from 'console';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { EventEmitter } from 'stream';
import { authenticator } from 'otplib';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user: any;
  tutorial: any;
  dateobs = new BehaviorSubject<any>('');
  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private db: AngularFireDatabase,
    private http: HttpClient // private xhr: XMLHttpRequest
  ) {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.user = user;
        console.log(user, user.email);
        localStorage.setItem('user', JSON.stringify(this.user));
      } else {
        localStorage.setItem('user', null);
      }
    });
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user !== null;
  }

  get getUserMail(): string {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user.email;
  }

  async login(email: string, password: string) {
    try {
      var result = await this.afAuth
        .signInWithEmailAndPassword(email, password)
        .then((datadd) => {
          if (email === 'admin@gmail.com') {
            this.router.navigate(['admin']);
          } else {
            this.user = datadd;
            localStorage.setItem('user', JSON.stringify(this.user));
            this.router.navigate(['tabs']);
          }
        });
    } catch (error) {
      console.log(error);
      window.alert(error);
    }
  }

  async SignOut() {
    try {
      var result = await this.afAuth.signOut().then((data) => {
        console.log('sdfsdfsf', data);
        this.afAuth.updateCurrentUser(null);
        localStorage.setItem('user', null);
        this.router.navigate(['auth']);
      });
    } catch (error) {
      console.log(error);
      window.alert(error);
    }
  }

  getDate(): any {
    this.db
      .object('admins/timerange')
      .valueChanges()
      .subscribe((data) => {
        console.log(data !== undefined ? data : null);
        this.dateobs.next(data !== undefined ? data : null);
      });
  }

  setVoterData(dateValue2) {
    let date = this.db.object(`voters/${dateValue2.epicid}`);
    date.set(dateValue2);
  }

  setDate(dateValue2) {
    console.log(dateValue2);
    let date = this.db.object('admins/timerange');
    date.set(dateValue2);
  }

  async authTwostep(from, code: string): Promise<any> {
    let secretCode;
    if (from === 'admin') {
      secretCode = '12345678AASS';
    } else if (from === 'agent') {
      secretCode = '12345678BXYT';
    }
    console.log(authenticator.verify({ token: code, secret: secretCode }));

    // return this.http.get(
    //   `https://cors-anywhere.herokuapp.com/https://www.authenticatorapi.com/Validate.aspx?Pin=${code}&SecretCode=${secretCode}`
    // );
  }
}
