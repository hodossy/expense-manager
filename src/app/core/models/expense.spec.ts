import {Expense} from './expense';
import { Account } from './account';
import { Category } from './category';

describe('Expense', () => {
  it('should create an instance', () => {
    expect(new Expense()).toBeTruthy();
    expect(new Expense(10)).toBeTruthy();
    expect(new Expense(10, 'HUF')).toBeTruthy();
    expect(new Expense(10, 'HUF', new Date())).toBeTruthy();
    expect(new Expense(10, 'HUF', new Date(), new Account())).toBeTruthy();
    expect(new Expense(10, 'HUF', new Date(), new Account(), new Category())).toBeTruthy();
  });

  it('should serialize created date as timestamp', () => {
    let created = new Date();
    let expense = new Expense(10, 'HUF', created);
    expect(JSON.stringify(expense))
      .toEqual(`{"value":10,"currency":"HUF","created":${created.getTime()},"account":null,"category":null}`)
  });

  it('should be revived without account or category', () => {
    let created = new Date();
    let expense = new Expense(10, 'HUF', created);
    expect(JSON.parse(`{"value":10,"currency":"HUF","created":${created.getTime()},"account":null,"category":null}`, Expense.reviver))
      .toEqual(expense);
  });

  it('should be revived with account and category', () => {
    let created = new Date();
    let expense = new Expense(10, 'HUF', created, new Account(1), new Category(1));
    expect(JSON.parse(`{"value":10,"currency":"HUF","created":${created.getTime()},"account":1,"category":1}`, Expense.reviver))
      .toEqual(expense);
  });

  it('should be converted to and from JSON equally', () => {
    var expense = new Expense();
    expect(Expense.fromJSON(JSON.stringify(expense))).toEqual(expense);
    expense = new Expense(10);
    expect(Expense.fromJSON(JSON.stringify(expense))).toEqual(expense);
    expense = new Expense(10, 'HUF');
    expect(Expense.fromJSON(JSON.stringify(expense))).toEqual(expense);
    expense = new Expense(10, 'HUF', new Date());
    expect(Expense.fromJSON(JSON.stringify(expense))).toEqual(expense);
    expense = new Expense(10, 'HUF', new Date(), new Account(1));
    expect(Expense.fromJSON(JSON.stringify(expense))).toEqual(expense);
    expense = new Expense(10, 'HUF', new Date(), new Account(1), new Category(1));
    expect(Expense.fromJSON(JSON.stringify(expense))).toEqual(expense);
  });
});
