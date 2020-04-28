import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListeProductInterestPage } from './liste-product-interest.page';

const routes: Routes = [
  {
    path: '',
    component: ListeProductInterestPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListeProductInterestPageRoutingModule {}
