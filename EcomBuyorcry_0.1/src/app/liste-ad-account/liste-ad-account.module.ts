import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListeAdAccountPageRoutingModule } from './liste-ad-account-routing.module';

import { ListeAdAccountPage } from './liste-ad-account.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListeAdAccountPageRoutingModule
  ],
  declarations: [ListeAdAccountPage]
})
export class ListeAdAccountPageModule {}
