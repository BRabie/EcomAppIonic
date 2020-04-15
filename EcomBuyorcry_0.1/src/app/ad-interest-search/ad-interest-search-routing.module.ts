import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdInterestSearchPage } from './ad-interest-search.page';

const routes: Routes = [
  {
    path: '',
    component: AdInterestSearchPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdInterestSearchPageRoutingModule {}
