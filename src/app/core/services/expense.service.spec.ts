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
    service.add(new Expense(10, "HUF", undefined, account));
    expect(service.all.length).toEqual(1);
  });

  it('should filter by Account', () => {
    service.add(new Expense(10, "HUF"));
    service.add(new Expense(10, "HUF", undefined, account));
    expect(service.getExpensesForAccount(account).length).toEqual(1);
  });

  it('should filter by Category', () => {
    service.add(new Expense(10, "HUF"));
    service.add(new Expense(10, "HUF", undefined, account, category));
    expect(service.getExpensesForCategory(category).length).toEqual(1);
  });

  it('should export expenses to JSON', () => {
    let created = new Date(1);
    service.add(new Expense(10, "HUF", created));
    service.add(new Expense(100, "HUF", created, account));
    service.add(new Expense(1000, "HUF", created, undefined, category));
    service.add(new Expense(10000, "HUF", created, account, category));
    expect(service.export()).toEqual(
      '[{"value":10,"currency":"HUF","created":1,"account":null,"category":null},' +
      '{"value":100,"currency":"HUF","created":1,"account":1,"category":null},' +
      '{"value":1000,"currency":"HUF","created":1,"account":null,"category":2},' +
      '{"value":10000,"currency":"HUF","created":1,"account":1,"category":2}]'
    );
  });

  it('should import from JSON equally', () => {
    let created = new Date(1);
    service.add(new Expense(10, "HUF", created));
    service.add(new Expense(100, "HUF", created, account));
    service.add(new Expense(1000, "HUF", created, undefined, category));
    service.add(new Expense(10000, "HUF", created, account, category));
    let new_service = new ExpenseService();
    new_service.import(service.export())
    expect(new_service.all).toEqual(service.all);
  });
});
