import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CriticPageRoutingModule } from './critic-routing.module';

import { CriticPage } from './critic.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CriticPageRoutingModule
  ],
  declarations: [CriticPage]
})
export class CriticPageModule {}
