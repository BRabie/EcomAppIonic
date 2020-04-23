import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListeAdAccountPage } from './liste-ad-account.page';

const routes: Routes = [
  {
    path: '',
    component: ListeAdAccountPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListeAdAccountPageRoutingModule {}
