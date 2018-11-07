import { TestBed } from '@angular/core/testing';
import { Account, Category, Expense } from '../models';

import { ExpenseService } from './expense.service';

describe('ExpenseService', () => {
  let service: ExpenseService;
  let account: Account;
  let category: Category;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.get(ExpenseService);
    account = new Account(1);
    category = new Category(2);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add Expenses', () => {
    service.addExpense(new Expense(10, "HUF", undefined, account));
    expect(service.getExpenses().length).toEqual(1);
  });

  it('should filter by Account', () => {
    service.addExpense(new Expense(10, "HUF"));
    service.addExpense(new Expense(10, "HUF", undefined, account));
    expect(service.getExpensesForAccount(account).length).toEqual(1);
  });

  it('should filter by Category', () => {
    service.addExpense(new Expense(10, "HUF"));
    service.addExpense(new Expense(10, "HUF", undefined, account, category));
    expect(service.getExpensesForCategory(category).length).toEqual(1);
  });

  it('should be serialized to JSON', () => {
    let created = new Date(1);
    service.addExpense(new Expense(10, "HUF", created));
    service.addExpense(new Expense(100, "HUF", created, account));
    service.addExpense(new Expense(1000, "HUF", created, undefined, category));
    service.addExpense(new Expense(10000, "HUF", created, account, category));
    expect(JSON.stringify(service)).toEqual(
      '{"expenses":[{"value":10,"currency":"HUF","created":1,"account":null,"category":null},' +
      '{"value":100,"currency":"HUF","created":1,"account":1,"category":null},' +
      '{"value":1000,"currency":"HUF","created":1,"account":null,"category":2},' +
      '{"value":10000,"currency":"HUF","created":1,"account":1,"category":2}]}'
    );
  });

  it('should read expenses from JSON equally', () => {
    let created = new Date(1);
    service.addExpense(new Expense(10, "HUF", created));
    service.addExpense(new Expense(100, "HUF", created, account));
    service.addExpense(new Expense(1000, "HUF", created, undefined, category));
    service.addExpense(new Expense(10000, "HUF", created, account, category));
    let new_service = new ExpenseService();
    new_service.readExpenses(JSON.stringify(service))
    expect(new_service.getExpenses()).toEqual(service.getExpenses());
  });
});
