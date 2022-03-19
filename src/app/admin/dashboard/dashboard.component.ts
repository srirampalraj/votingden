import { Component, OnInit, ViewChild } from '@angular/core';
import { IonDatetime } from '@ionic/angular';
import { format, parseISO } from 'date-fns';
import { AuthService } from '../../shared/services/auth.service';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import formatRFC3339 from 'date-fns/formatRFC3339';
import * as mom from 'moment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  @ViewChild(IonDatetime, { static: true }) datetime: IonDatetime;

  dateValue = '';
  dateValue2 = '';
  voteDate: Date;
  startTime;
  endTime = new Date().toISOString();
  now = new Date().toISOString();
  form: FormGroup;
  constructor(private auth: AuthService, private fb: FormBuilder) {}

  confirm() {
    this.datetime.confirm();
  }

  reset() {
    this.datetime.reset();
  }

  setDate() {
    console.log(this.form.value);

    this.auth.setDate({
      start: mom(this.form.value.start).format('DD.MM.YYYY HH:mm'),
      end: mom(this.form.value.end).format('DD.MM.YYYY HH:mm'),
      date: mom(this.form.value.date).format('DD.MM.YYYY HH:mm'),
    });
  }

  formatDate(value: string) {
    return format(parseISO(value), 'MMM dd yyyy');
  }

  ngOnInit() {
    // this.form = new FormGroup({
    //   date: new FormControl(new Date().toISOString()),
    //   start: new FormControl(new Date().toISOString()),
    //   end: new FormControl(new Date().toISOString()),
    // });
    this.form = new FormGroup({
      date: new FormControl(),
      start: new FormControl(),
      end: new FormControl(),
    });
    // console.log(this.auth.dateobs);
    this.auth.getDate();
    this.auth.dateobs.subscribe((data) => {
      if (data !== undefined && data !== null && data !== '') {
        console.log(data, mom().toISOString());
        this.form.get('start').setValue(mom().format('hh:mm a'));
        this.form.get('start').updateValueAndValidity();
        this.form.get('end').setValue(new Date(data.end).toISOString());
        this.form.get('end').updateValueAndValidity();
        this.form.get('date').setValue(new Date(data.start).toISOString());
        this.form.get('date').updateValueAndValidity();
        console.log(this.form.value);
      }
    });
  }
}
