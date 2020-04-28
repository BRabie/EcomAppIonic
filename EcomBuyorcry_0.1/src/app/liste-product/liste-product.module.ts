import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListeProductPageRoutingModule } from './liste-product-routing.module';

import { ListeProductPage } from './liste-product.page';

@NgModule({
  entryComponents: [],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListeProductPageRoutingModule
  ],
  declarations: [ListeProductPage]
})
export class ListeProductPageModule {}
