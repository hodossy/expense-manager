import { Tree } from './tree';
import { Node } from './node';
import { ReplaySubject} from 'rxjs';

export abstract class NodeService<T extends Node> {
  private root: T;
  public all$: ReplaySubject<T[]>

  constructor() {
    this.all$ = new ReplaySubject(1);
  }

  setRoot(root: T): void {
    this.root = root;
    this.all$.next(<T[]>this.root.all);
  }

  export(): string {
    return JSON.stringify(this.root.all);
  }

  import(json: string): void {
    let nodes: Array<T> = JSON.parse(json).map((item) => {
      return this.fromJSON(item);
    }, this)
    if (nodes.length > 0) {
      let tree = new Tree(nodes);
      this.setRoot(<T>tree.root);
    }
  }

  abstract fromJSON(json: any): T;
}
