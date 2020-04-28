import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdInterestSearchListeProductPage } from './ad-interest-search-liste-product.page';

const routes: Routes = [
  {
    path: '',
    component: AdInterestSearchListeProductPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdInterestSearchListeProductPageRoutingModule {}
