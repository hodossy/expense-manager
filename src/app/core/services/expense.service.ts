import { Injectable } from '@angular/core';
import { Account, Category, Expense } from '../models'

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {
  private expenses: Array<Expense> = new Array<Expense>();

  getExpensesForAccount(account: Account): Array<Expense> {
    return this.expenses.filter((expense: Expense): boolean => {
      return expense.account && expense.account.id === account.id;
    });
  }

  getExpensesForCategory(category: Category): Array<Expense> {
    return this.expenses.filter((expense: Expense): boolean => {
      return expense.category && expense.category.id === category.id;
    });
  }

  addExpense(expense: Expense): void {
    this.expenses.push(expense);
  }

  getExpenses(): Array<Expense> {
    return this.expenses;
  }

  readExpenses(json: string): void {
    this.expenses = JSON.parse(json).expenses.map((expense: any) => {
      return Expense.fromJSON(expense);
    })
  }
}
