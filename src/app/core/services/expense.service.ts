import { Injectable } from '@angular/core';
import { Account, Category, Expense } from '../models'
import { ListServiceBase } from './list-service.base';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService extends ListServiceBase<Expense> {

  getExpensesForAccount(account: Account): Array<Expense> {
    return this.items.filter((expense: Expense): boolean => {
      return expense.account && expense.account.id === account.id;
    });
  }

  getExpensesForCategory(category: Category): Array<Expense> {
    return this.items.filter((expense: Expense): boolean => {
      return expense.category && expense.category.id === category.id;
    });
  }

  fromJSON = Expense.fromJSON;
}
