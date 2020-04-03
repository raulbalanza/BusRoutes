import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LineInfoPage } from './line-info.page';

const routes: Routes = [
  {
    path: '',
    component: LineInfoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LineInfoPageRoutingModule {}
