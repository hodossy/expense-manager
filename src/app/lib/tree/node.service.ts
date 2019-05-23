import { Tree } from './tree';
import { Node } from './node';
import { Observable, of, empty } from 'rxjs';

export abstract class NodeService<T extends Node> {
  private root: T;

  get all$(): Observable<T[]> {
    return this.root ? of(<T[]>this.root.all) : empty();
  }

  setRoot(root: T): void {
    this.root = root;
  }

  export(): string {
    return JSON.stringify(this.root.all);
  }

  import(json: string): void {
    let nodes = JSON.parse(json).map((item) => {
      return this.fromJSON(item);
    }, this)
    let tree = new Tree(nodes);
    this.root = <T>tree.root;
  }

  abstract fromJSON(json: any): T;
}
