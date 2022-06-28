import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PersonnePage } from './personne.page';

const routes: Routes = [
  {
    path: '',
    component: PersonnePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PersonnePageRoutingModule {}
