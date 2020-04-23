import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListeProductInterestsCategoryPage } from './liste-product-interests-category.page';

const routes: Routes = [
  {
    path: '',
    component: ListeProductInterestsCategoryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListeProductInterestsCategoryPageRoutingModule {}
