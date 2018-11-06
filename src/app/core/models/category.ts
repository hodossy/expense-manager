import { Node } from './tree';
import { Expense } from './expense';

export class Category extends Node {
  public id: number;
  public name: string;
  public expenses: Array<Expense>;

  constructor(id?: number, name?: string) {
    super();
    this.id = id;
    this.name = name;
  }

  toJSON() {
    return {id: this.id, name: this.name}
  }
}
