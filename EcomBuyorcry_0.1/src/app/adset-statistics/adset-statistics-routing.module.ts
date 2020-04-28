import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdsetStatisticsPage } from './adset-statistics.page';

const routes: Routes = [
  {
    path: '',
    component: AdsetStatisticsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdsetStatisticsPageRoutingModule {}
