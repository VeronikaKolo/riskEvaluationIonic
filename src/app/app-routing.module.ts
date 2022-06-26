import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'parametres',
    loadChildren: () => import('./parametres/parametres.module').then( m => m.ParametresPageModule)
  },
  {
    path: 'synthese',
    loadChildren: () => import('./synthese/synthese.module').then( m => m.SynthesePageModule)
  },
  {
    path: 'personne',
    loadChildren: () => import('./personne/personne.module').then( m => m.PersonnePageModule)
  },
  {
    path: 'risk',
    loadChildren: () => import('./risk/risk.module').then( m => m.RiskPageModule)
  },
  {
    path: 'history',
    loadChildren: () => import('./history/history.module').then( m => m.HistoryPageModule)
  },
  {
    path: 'critic',
    loadChildren: () => import('./critic/critic.module').then( m => m.CriticPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
