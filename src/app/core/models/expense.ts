import { Account } from './account';
import { Category } from './category';

export class Expense {
  public value: number;
  public currency: string;
  public created: Date;
  public account: Account;
  public category: Category;
}
