import { Account } from './account';
import { Category } from './category';

export class Expense {
  public value: number;
  public currency: string;
  public created: Date;
  public account: Account;
  public category: Category;

  constructor(value?: number, currency?: string, created?: Date, account?: Account, category?: Category) {
    this.value = value;
    this.currency = currency;
    this.created = created;
    this.account = account;
    this.category = category;
  };
}
