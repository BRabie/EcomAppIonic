import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdInterestSearchPageRoutingModule } from './ad-interest-search-routing.module';

import { AdInterestSearchPage } from './ad-interest-search.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdInterestSearchPageRoutingModule
  ],
  declarations: [AdInterestSearchPage]
})
export class AdInterestSearchPageModule {}
