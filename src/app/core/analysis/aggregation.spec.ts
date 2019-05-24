import { Expense } from '../models';
import { aggregate } from './aggregation';

describe('aggregate', () => {
  it('should calculate sum of expenses', () => {
    let expenses = [new Expense(1), new Expense(10), new Expense(-100)];
    expect(aggregate(expenses)).toEqual(-89);
  });

  it('should return 0 if nothing is passed', () => {
    expect(aggregate([])).toEqual(0);
  });
});
