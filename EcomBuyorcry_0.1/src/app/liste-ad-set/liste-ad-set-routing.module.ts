import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListeAdSetPage } from './liste-ad-set.page';

const routes: Routes = [
  {
    path: '',
    component: ListeAdSetPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListeAdSetPageRoutingModule {}
