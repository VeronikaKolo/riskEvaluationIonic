import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RiskPageRoutingModule } from './risk-routing.module';

import { RiskPage } from './risk.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RiskPageRoutingModule
  ],
  declarations: [RiskPage]
})
export class RiskPageModule {}
