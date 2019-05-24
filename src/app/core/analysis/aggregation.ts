import { Expense } from '../models';

export function aggregate(expenses: Expense[]): number {
  return expenses.reduce<number>((prev: number, cur: Expense) => {
    return prev + cur.value;
  }, 0)
}
