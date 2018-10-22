import {Expense} from './expense';
import { Account } from './account';
import { Category } from './category';

describe('Expense', () => {
  it('should create an instance', () => {
    expect(new Expense()).toBeTruthy();
    expect(new Expense(10)).toBeTruthy();
    expect(new Expense(10, 'HUF')).toBeTruthy();
    expect(new Expense(10, 'HUF', Date.now())).toBeTruthy();
    expect(new Expense(10, 'HUF', Date.now(), new Account())).toBeTruthy();
    expect(new Expense(10, 'HUF', Date.now(), new Account(), new Category)).toBeTruthy();
  });
});
