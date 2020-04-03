import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StopInfoPage } from './stop-info.page';

const routes: Routes = [
  {
    path: '',
    component: StopInfoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StopInfoPageRoutingModule {}
