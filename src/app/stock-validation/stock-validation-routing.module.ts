import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StockValidationPage } from './stock-validation.page';

const routes: Routes = [
  {
    path: '',
    component: StockValidationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StockValidationPageRoutingModule {}
