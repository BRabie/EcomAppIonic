import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'liste-ad-account',
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
  },
  {
    path: 'liste-ad-account',
    loadChildren: () => import('./liste-ad-account/liste-ad-account.module').then( m => m.ListeAdAccountPageModule)
  },
  {
    path: 'create-ad-set',
    loadChildren: () => import('./create-ad-set/create-ad-set.module').then( m => m.CreateAdSetPageModule)
  },
  {
    path: 'liste-product',
    loadChildren: () => import('./liste-product/liste-product.module').then( m => m.ListeProductPageModule)
  },
  {
    path: 'liste-product-interests-category',
    loadChildren: () => import('./liste-product-interests-category/liste-product-interests-category.module').then( m => m.ListeProductInterestsCategoryPageModule)
  },
  {
    path: 'create-product',
    loadChildren: () => import('./create-product/create-product.module').then( m => m.CreateProductPageModule)
  },
  {
    path: 'ad-interest-search-liste-product',
    loadChildren: () => import('./ad-interest-search-liste-product/ad-interest-search-liste-product.module').then( m => m.AdInterestSearchListeProductPageModule)
  },
  {
    path: 'ad-interest-search-liste-product-interests-category',
    loadChildren: () => import('./ad-interest-search-liste-product-interests-category/ad-interest-search-liste-product-interests-category.module').then( m => m.AdInterestSearchListeProductInterestsCategoryPageModule)
  },
  {
    path: 'liste-product-interest',
    loadChildren: () => import('./liste-product-interest/liste-product-interest.module').then( m => m.ListeProductInterestPageModule)
  },
  {
    path: 'export-product-categories',
    loadChildren: () => import('./export-product-categories/export-product-categories.module').then( m => m.ExportProductCategoriesPageModule)
  },
  {
    path: 'adset-statistics',
    loadChildren: () => import('./adset-statistics/adset-statistics.module').then( m => m.AdsetStatisticsPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
