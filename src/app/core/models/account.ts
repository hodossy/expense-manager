import { Node } from './tree';
import {User} from './user';

export class Account extends Node {
  public id: number;
  public name: string;
  public owner: User;
  public archived: boolean;
  public created: Date;
}
