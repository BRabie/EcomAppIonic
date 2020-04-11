import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListeBusinessAccountPageRoutingModule } from './liste-business-account-routing.module';

import { ListeBusinessAccountPage } from './liste-business-account.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListeBusinessAccountPageRoutingModule
  ],
  declarations: [ListeBusinessAccountPage]
})
export class ListeBusinessAccountPageModule {}
