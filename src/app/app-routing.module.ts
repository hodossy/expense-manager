import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {
  AboutPageComponent, AccountPageComponent, CategoriesPageComponent,
  DashboardPageComponent, NotFoundPageComponent, SettingsPageComponent
} from './components'

const routes: Routes = [
  { path: 'about', component: AboutPageComponent },
  { path: 'accounts/:id', component: AccountPageComponent },
  { path: 'categories', component: CategoriesPageComponent },
  { path: 'dashboard', component: DashboardPageComponent },
  { path: 'settings', component: SettingsPageComponent },
  { path: 'accounts', redirectTo: '/accounts/0', pathMatch: 'full'  },
  { path: '',   redirectTo: '/accounts/0', pathMatch: 'full' },
  { path: '**', component: NotFoundPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
