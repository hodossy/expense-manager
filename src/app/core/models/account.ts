import { Node } from '../../lib/tree';
import { Expense } from './expense';

interface AccountJSON {
  left: number;
  right: number;
  id: number;
  name: string;
  archived: boolean;
}

export class Account extends Node {
  public id: number;
  public name: string;
  public archived: boolean;
  public expenses: Array<Expense> = [];

  constructor(id?: number, name?: string, archived?: boolean) {
    super();
    this.skip.push('expenses');
    this.id = id;
    this.name = name;
    this.archived = archived;
  }

  get displayName(): string {
    return this.parent ? (<Account>this.parent).displayName + " > " + this.name : this.name;
  }

  static fromJSON(json: string|AccountJSON): Account {
    if (typeof json === 'string') {
      return JSON.parse(json, Account.reviver);
    } else {
      let account = new Account();
      return Object.assign(account, json);
    }
  }

  static reviver(key: string, value: any): any {
    return key === "" ? Account.fromJSON(value) : value;
  }
}
