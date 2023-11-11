import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Error404PageComponent } from './shared/pages/error404-page/error404-page.component';
import { canActivateGuard, canMatchGuard } from './auth/guards/auth.guard';
import * as publicGuard from './auth/guards/public.guard';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import ('./auth/auth.module').then(m => m.AuthModule),
    canActivate: [publicGuard.canActivateGuard],
    canMatch: [publicGuard.canMatchGuard]
  },
  {
    path: 'heroes',
    loadChildren: () => import ('./heroes/heroes.module').then(m => m.HeroesModule),
    // Deprecated authGuard
    // canActivate: [AuthGuard],
    // canMatch: [AuthGuard]
    canActivate: [canActivateGuard],
    canMatch: [canMatchGuard]
  },
  {
    path: '404',
    component: Error404PageComponent
  },
  {
    path:'',
    redirectTo: 'heroes',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '404'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
