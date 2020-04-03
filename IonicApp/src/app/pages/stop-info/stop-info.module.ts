import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StopInfoPageRoutingModule } from './stop-info-routing.module';

import { StopInfoPage } from './stop-info.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StopInfoPageRoutingModule
  ],
  declarations: [StopInfoPage]
})
export class StopInfoPageModule {}
