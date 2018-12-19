import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { MatToolbarModule } from '@angular/material/toolbar';

import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AccountPageComponent } from './components/account-page/account-page.component';
import { CategoriesPageComponent } from './components/categories-page/categories-page.component';
import { SettingsPageComponent } from './components/settings-page/settings-page.component';
import { DashboardPageComponent } from './components/dashboard-page/dashboard-page.component';
import { AboutPageComponent } from './components/about-page/about-page.component';
import { NotFoundPageComponent } from './components/not-found-page/not-found-page.component';

@NgModule({
  declarations: [
    AppComponent,
    AccountPageComponent,
    CategoriesPageComponent,
    SettingsPageComponent,
    DashboardPageComponent,
    AboutPageComponent,
    NotFoundPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
