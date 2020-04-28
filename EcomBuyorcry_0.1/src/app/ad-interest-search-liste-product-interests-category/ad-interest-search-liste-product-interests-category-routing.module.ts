import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdInterestSearchListeProductInterestsCategoryPage } from './ad-interest-search-liste-product-interests-category.page';

const routes: Routes = [
  {
    path: '',
    component: AdInterestSearchListeProductInterestsCategoryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdInterestSearchListeProductInterestsCategoryPageRoutingModule {}
