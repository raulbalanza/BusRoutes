import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LineInfoPageRoutingModule } from './line-info-routing.module';

import { LineInfoPage } from './line-info.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LineInfoPageRoutingModule
  ],
  declarations: [LineInfoPage]
})
export class LineInfoPageModule {}
