import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateAdSetPageRoutingModule } from './create-ad-set-routing.module';

import { CreateAdSetPage } from './create-ad-set.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateAdSetPageRoutingModule
  ],
  declarations: [CreateAdSetPage]
})
export class CreateAdSetPageModule {}
