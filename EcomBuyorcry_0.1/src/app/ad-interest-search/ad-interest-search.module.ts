import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdInterestSearchPageRoutingModule } from './ad-interest-search-routing.module';

import { AdInterestSearchPage } from './ad-interest-search.page';
import { ListeProductPage } from '../liste-product/liste-product.page';
import { AdInterestSearchListeProductPage } from '../ad-interest-search-liste-product/ad-interest-search-liste-product.page';

@NgModule({
  entryComponents: [AdInterestSearchListeProductPage],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdInterestSearchPageRoutingModule
  ],
  declarations: [AdInterestSearchPage,AdInterestSearchListeProductPage]
})
export class AdInterestSearchPageModule {}
