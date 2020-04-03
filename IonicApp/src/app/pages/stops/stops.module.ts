import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StopsPageRoutingModule } from './stops-routing.module';

import { StopsPage } from './stops.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StopsPageRoutingModule
  ],
  declarations: [StopsPage]
})
export class StopsPageModule {}
