import { Account } from './account';
import { Category } from './category';

interface ExpenseJSON {
  value: number;
  currency: string;
  created: number;
  account: number;
  category: number;
}

export class Expense {
  public value: number;
  public currency: string;
  public created: Date;
  public account: Account;
  public category: Category;

  constructor(value?: number, currency?: string, created?: Date, account?: Account, category?: Category) {
    this.value = value;
    this.currency = currency;
    this.created = created || new Date();
    this.account = account;
    this.category = category;
  };

  toJSON(): ExpenseJSON {
    return Object.assign({}, this, {
      created: this.created.getTime(),
      account: this.account ? this.account.id: undefined,
      category: this.category ? this.category.id : undefined
    });
  }

  static fromJSON(json: string|ExpenseJSON): Expense {
    if (typeof json === 'string') {
      return JSON.parse(json, Expense.reviver);
    } else {
      let expense = new Expense();
      return Object.assign(expense, json, {
        created: new Date(json.created),
        account: json.account ? new Account(json.account) : undefined,
        category: json.category ? new Category(json.category) : undefined,
      });
    }
  }

  static reviver(key: string, value: any): any {
    return key === "" ? Expense.fromJSON(value) : value;
  }
}
