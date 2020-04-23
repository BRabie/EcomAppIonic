import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListeProductPage } from './liste-product.page';

const routes: Routes = [
  {
    path: '',
    component: ListeProductPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListeProductPageRoutingModule {}
