import { Component, OnInit, ViewChild } from '@angular/core';
import { IonDatetime } from '@ionic/angular';
import { format, parseISO } from 'date-fns';
import { AuthService } from '../shared/services/auth.service';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import formatRFC3339 from 'date-fns/formatRFC3339';
import * as mom from 'moment';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {
  constructor() {}

  ngOnInit() {}
}
