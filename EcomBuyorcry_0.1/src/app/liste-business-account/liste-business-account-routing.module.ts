import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListeBusinessAccountPage } from './liste-business-account.page';

const routes: Routes = [
  {
    path: '',
    component: ListeBusinessAccountPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListeBusinessAccountPageRoutingModule {}
