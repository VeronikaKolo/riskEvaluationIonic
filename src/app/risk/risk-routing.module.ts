import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RiskPage } from './risk.page';

const routes: Routes = [
  {
    path: '',
    component: RiskPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RiskPageRoutingModule {}
