import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListeProductInterestPageRoutingModule } from './liste-product-interest-routing.module';

import { ListeProductInterestPage } from './liste-product-interest.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListeProductInterestPageRoutingModule
  ],
  declarations: [ListeProductInterestPage]
})
export class ListeProductInterestPageModule {}
