import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './_helpers/auth.guard';
import { AuthRedirectGuard } from './_helpers/authRedirectGuard';
const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [AuthRedirectGuard], // Protect the login route
  },
  {
    path: '',
    component: AdminLayoutComponent,
    canActivate: [AuthGuard], // Protect this route
    children: [
      {
        path: '',
        loadChildren: () => import('./layouts/admin-layout/admin-layout.module').then(x => x.AdminLayoutModule),
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];
@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes, {
      useHash: false
    })
  ],
  exports: []
})
export class AppRoutingModule { }
