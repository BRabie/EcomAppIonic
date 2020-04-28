import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdsetStatisticsPageRoutingModule } from './adset-statistics-routing.module';

import { AdsetStatisticsPage } from './adset-statistics.page';

import { ChartsModule } from 'ng2-charts';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdsetStatisticsPageRoutingModule,
    ChartsModule
  ],
  declarations: [AdsetStatisticsPage]
})
export class AdsetStatisticsPageModule {}