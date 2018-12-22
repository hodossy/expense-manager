import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }   from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';

import { AccountDetailComponent } from './components/account-detail/account-detail.component';
import { AccountListComponent } from './components/account-list/account-list.component';
import { AddExpenseComponent, AddExpenseDialogComponent } from './components/add-expense/add-expense.component';
import { CategoryDetailComponent } from './components/category-detail/category-detail.component';
import { CategoryListComponent } from './components/category-list/category-list.component';
import { ExpenseListComponent } from './components/expense-list/expense-list.component';
import { ExpenseDetailComponent } from './components/expense-detail/expense-detail.component';

import { IndicatorDirective } from './directives/indicator.directive';

import { EM_SUPPORTED_CURRENCIES } from './injection-tokens';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatDatepickerModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatMomentDateModule,
    MatSelectModule,
    MatTableModule
  ],
  declarations: [
    AccountDetailComponent,
    AccountListComponent,
    CategoryDetailComponent,
    CategoryListComponent,
    ExpenseListComponent,
    ExpenseDetailComponent,
    IndicatorDirective,
    AddExpenseComponent,
    AddExpenseDialogComponent
  ],
  exports: [
    AccountDetailComponent,
    AccountListComponent,
    CategoryDetailComponent,
    CategoryListComponent,
    ExpenseListComponent,
    ExpenseDetailComponent,
    AddExpenseComponent
  ],
  entryComponents: [
    AddExpenseDialogComponent
  ],
  providers: [
    {provide: EM_SUPPORTED_CURRENCIES, useValue: ['HUF', 'EUR', 'USD']}
  ]
})
export class CoreModule { }
