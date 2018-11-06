import { Node } from './tree';
import { Expense } from './expense';

export class Account extends Node {
  public id: number;
  public name: string;
  public archived: boolean;
  public expenses: Array<Expense>;

  constructor(id?: number, name?: string, archived?: boolean) {
    super();
    this.id = id;
    this.name = name;
    this.archived = archived;
  }

  toJSON() {
    return {id: this.id, name: this.name, archived: this.archived}
  }
}
