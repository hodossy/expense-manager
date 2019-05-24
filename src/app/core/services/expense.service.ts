import { Injectable } from '@angular/core';
import { Account, Category, Expense } from '../models'
import { ListServiceBase } from './list-service.base';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService extends ListServiceBase<Expense> {

  getExpensesForAccount$(account: Account): Observable<Expense[]> {
    return this.all$.pipe(
      map((expenses: Expense[]) => {
        return expenses.filter((expense: Expense): boolean => {
          return expense.account && expense.account.id === account.id;
        });
      })
    );
  }

  getExpensesForCategory$(category: Category): Observable<Expense[]> {
    return this.all$.pipe(
      map((expenses: Expense[]) => {
        return expenses.filter((expense: Expense): boolean => {
          return expense.category && expense.category.id === category.id;
        });
      })
    );
  }

  fromJSON = Expense.fromJSON;
}
