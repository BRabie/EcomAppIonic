import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdInterestSearchListeProductInterestsCategoryPageRoutingModule } from './ad-interest-search-liste-product-interests-category-routing.module';

import { AdInterestSearchListeProductInterestsCategoryPage } from './ad-interest-search-liste-product-interests-category.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdInterestSearchListeProductInterestsCategoryPageRoutingModule
  ],
  declarations: [AdInterestSearchListeProductInterestsCategoryPage]
})
export class AdInterestSearchListeProductInterestsCategoryPageModule {}
