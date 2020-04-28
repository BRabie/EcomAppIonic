import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExportProductCategoriesPageRoutingModule } from './export-product-categories-routing.module';

import { ExportProductCategoriesPage } from './export-product-categories.page';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExportProductCategoriesPageRoutingModule,
    NgxDatatableModule
  ],
  declarations: [ExportProductCategoriesPage]
})
export class ExportProductCategoriesPageModule {}
