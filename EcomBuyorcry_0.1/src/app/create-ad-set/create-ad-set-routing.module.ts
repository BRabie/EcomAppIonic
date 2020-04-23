import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateAdSetPage } from './create-ad-set.page';

const routes: Routes = [
  {
    path: '',
    component: CreateAdSetPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateAdSetPageRoutingModule {}
