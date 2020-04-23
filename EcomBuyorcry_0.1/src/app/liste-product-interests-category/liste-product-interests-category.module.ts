import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListeProductInterestsCategoryPageRoutingModule } from './liste-product-interests-category-routing.module';

import { ListeProductInterestsCategoryPage } from './liste-product-interests-category.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListeProductInterestsCategoryPageRoutingModule
  ],
  declarations: [ListeProductInterestsCategoryPage]
})
export class ListeProductInterestsCategoryPageModule {}
