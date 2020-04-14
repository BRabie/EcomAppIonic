import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListeCampagnePageRoutingModule } from './liste-campagne-routing.module';

import { ListeCampagnePage } from './liste-campagne.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListeCampagnePageRoutingModule
  ],
  declarations: [ListeCampagnePage]
})
export class ListeCampagnePageModule {}
