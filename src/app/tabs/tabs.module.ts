import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TabsPageRoutingModule } from './tabs-routing.module';

import { TabsPage } from './tabs.page';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AddUserComponent } from './add-user/add-user.component';
import { MaterialModule } from '../material.module';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { AuthService } from '../shared/services/auth.service';
import { PopupAuthComponent } from '../shared/components/popup-auth/popup-auth.component';

export const options: Partial<IConfig> | (() => Partial<IConfig>) = null;

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TabsPageRoutingModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    NgxMaskModule.forRoot(),
    MaterialFileInputModule,
  ],
  declarations: [TabsPage, AddUserComponent],
  providers: [AuthService],
})
export class TabsPageModule {}
