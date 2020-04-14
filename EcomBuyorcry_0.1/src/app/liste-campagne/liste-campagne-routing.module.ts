import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListeCampagnePage } from './liste-campagne.page';

const routes: Routes = [
  {
    path: '',
    component: ListeCampagnePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListeCampagnePageRoutingModule {}
