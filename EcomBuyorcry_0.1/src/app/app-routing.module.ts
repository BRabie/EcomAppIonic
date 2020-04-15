import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'liste-business-account',
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'liste-business-account',
    loadChildren: () => import('./liste-business-account/liste-business-account.module').then( m => m.ListeBusinessAccountPageModule)
  },
  {
    path: 'liste-campagne',
    loadChildren: () => import('./liste-campagne/liste-campagne.module').then( m => m.ListeCampagnePageModule)
  },
  {
    path: 'liste-ad-set',
    loadChildren: () => import('./liste-ad-set/liste-ad-set.module').then( m => m.ListeAdSetPageModule)
  },
  {
    path: 'ad-interest-search',
    loadChildren: () => import('./ad-interest-search/ad-interest-search.module').then( m => m.AdInterestSearchPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
