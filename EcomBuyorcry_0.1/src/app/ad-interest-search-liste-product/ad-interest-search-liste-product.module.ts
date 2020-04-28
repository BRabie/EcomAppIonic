import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdInterestSearchListeProductPageRoutingModule } from './ad-interest-search-liste-product-routing.module';

import { AdInterestSearchListeProductPage } from './ad-interest-search-liste-product.page';

@NgModule({
  
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdInterestSearchListeProductPageRoutingModule
  ],
  declarations: [AdInterestSearchListeProductPage]
})
export class AdInterestSearchListeProductPageModule {}
