import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule) },
  { path: 'login', loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule) },
  { path: 'register', loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule) },
  { path: 'shop', loadChildren: () => import('./shop/shop.module').then( m => m.ShopPageModule) },
  { path: 'shop/:id', loadChildren: () => import('./shop-details/shop-details.module').then( m => m.ShopDetailsPageModule) }


];
@NgModule({
  imports: [ RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
