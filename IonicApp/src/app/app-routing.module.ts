import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule )
  },
  {
    path: 'stops',
    loadChildren: () => import('./pages/stops/stops.module').then( m => m.StopsPageModule)
  },
  {
    path: 'lines',
    loadChildren: () => import('./pages/lines/lines.module').then( m => m.LinesPageModule)
  },
  {
    path: 'map/:type/:id',
    loadChildren: () => import('./pages/map/map.module').then( m => m.MapPageModule)
  },
  {
    path: 'stop-info/:id',
    loadChildren: () => import('./pages/stop-info/stop-info.module').then( m => m.StopInfoPageModule)
  },
  {
    path: 'line-info/:id',
    loadChildren: () => import('./pages/line-info/line-info.module').then( m => m.LineInfoPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
