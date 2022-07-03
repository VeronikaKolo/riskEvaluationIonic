import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CriticPage } from './critic.page';

const routes: Routes = [
  {
    path: '',
    component: CriticPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CriticPageRoutingModule {}
