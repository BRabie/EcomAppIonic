import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListeAdSetPageRoutingModule } from './liste-ad-set-routing.module';

import { ListeAdSetPage } from './liste-ad-set.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListeAdSetPageRoutingModule
  ],
  declarations: [ListeAdSetPage]
})
export class ListeAdSetPageModule {}
