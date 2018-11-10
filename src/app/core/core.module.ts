import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountDetailComponent } from './components/account-detail/account-detail.component';
import { AccountListComponent } from './components/account-list/account-list.component';
import { CategoryDetailComponent } from './components/category-detail/category-detail.component';
import { CategoryListComponent } from './components/category-list/category-list.component';
import { ExpenseListComponent } from './components/expense-list/expense-list.component';
import { ExpenseDetailComponent } from './components/expense-detail/expense-detail.component';

import { IndicatorDirective } from './directives/indicator.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    AccountDetailComponent,
    AccountListComponent,
    CategoryDetailComponent,
    CategoryListComponent,
    ExpenseListComponent,
    ExpenseDetailComponent,
    IndicatorDirective
  ]
})
export class CoreModule { }
