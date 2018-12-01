import { Expense } from './expense';
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
    let created = new Date(1);
    let expense = new Expense(10, 'HUF', created);
    expect(JSON.stringify(expense))
      .toEqual('{"value":10,"currency":"HUF","created":1}');
  });

  it('should be revived without account or category', () => {
    let created = new Date(1);
    let expense = new Expense(10, 'HUF', created);
    expect(Expense.fromJSON('{"value":10,"currency":"HUF","created":1}'))
      .toEqual(expense);
  });

  it('should be revived with account and category', () => {
    let created = new Date(1);
    let expense = new Expense(10, 'HUF', created, new Account(1), new Category(1));
    expect(Expense.fromJSON('{"value":10,"currency":"HUF","created":1,"account":1,"category":1}'))
      .toEqual(expense);
  });

  it('should be converted to and from JSON equally', () => {
    let expense = new Expense();
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
