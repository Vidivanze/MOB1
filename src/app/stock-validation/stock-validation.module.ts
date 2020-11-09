import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StockValidationPageRoutingModule } from './stock-validation-routing.module';

import { StockValidationPage } from './stock-validation.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StockValidationPageRoutingModule
  ],
  declarations: [StockValidationPage]
})
export class StockValidationPageModule {}
