import { TestBed } from '@angular/core/testing';
import { Account, Category, Expense } from '../models';
import { forkJoin } from 'rxjs';
import { take } from 'rxjs/operators';

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
    let sub = service.all$.subscribe((expenses) => {
      expect(expenses.length).toEqual(1);
    });
    sub.unsubscribe();
  });

  it('should filter by Account', () => {
    service.add(new Expense(10, "HUF"));
    service.add(new Expense(10, "HUF", undefined, account));
    let sub = service.getExpensesForAccount$(account).subscribe((expenses) => {
      expect(expenses.length).toEqual(1);
    });
    sub.unsubscribe();
  });

  it('should filter by Category', () => {
    service.add(new Expense(10, "HUF"));
    service.add(new Expense(10, "HUF", undefined, account, category));
    let sub = service.getExpensesForCategory$(category).subscribe((expenses) => {
      expect(expenses.length).toEqual(1);
    });
    sub.unsubscribe();
  });

  it('should export expenses to JSON', () => {
    let created = new Date(1);
    service.add(new Expense(10, "HUF", created));
    service.add(new Expense(100, "HUF", created, account));
    service.add(new Expense(1000, "HUF", created, undefined, category));
    service.add(new Expense(10000, "HUF", created, account, category));
    expect(service.export()).toEqual(
      '[{"value":10,"currency":"HUF","created":1},' +
      '{"value":100,"currency":"HUF","created":1,"account":1},' +
      '{"value":1000,"currency":"HUF","created":1,"category":2},' +
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
    let sub = forkJoin(
      new_service.all$.pipe(take(1)),
      service.all$.pipe(take(1))
    ).subscribe((result) => {
      expect(result[0]).toEqual(result[1]);
    });
    sub.unsubscribe();
  });
});
