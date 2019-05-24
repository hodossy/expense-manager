import { Node } from '../../lib/tree';
import { Expense } from './expense';

interface CategoryJSON {
  left: number;
  right: number;
  id: number;
  name: string;
}

export class Category extends Node {
  public id: number;
  public name: string;
  public expenses: Array<Expense> = [];

  constructor(id?: number, name?: string) {
    super();
    this.skip.push('expenses');
    this.id = id;
    this.name = name;
  }

  get displayName(): string {
    return this.parent ? (<Category>this.parent).displayName + " > " + this.name : this.name;
  }

  static fromJSON(json: string|CategoryJSON): Category {
    if (typeof json === 'string') {
      return JSON.parse(json, Category.reviver);
    } else {
      let category = new Category();
      return Object.assign(category, json);
    }
  }

  static reviver(key: string, value: any): any {
    return key === "" ? Category.fromJSON(value) : value;
  }
}
