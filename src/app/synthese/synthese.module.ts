import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SynthesePageRoutingModule } from './synthese-routing.module';

import { SynthesePage } from './synthese.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SynthesePageRoutingModule
  ],
  declarations: [SynthesePage]
})
export class SynthesePageModule {}
