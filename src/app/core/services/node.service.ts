import { Node, Tree } from '../models';

export abstract class NodeService<T extends Node> {
  private tree: Tree;

  get all() {
    return this.tree.all;
  }

  export(): string {
    return JSON.stringify(this.tree.all);
  }

  import(json: string): void {
    let nodes = JSON.parse(json).map((item) => {
      return this.fromJSON(item);
    }, this)
    this.tree = new Tree(nodes);
  }

  setTree(tree: Tree): void {
    this.tree = tree;
  }

  abstract fromJSON(json: any): T;
}
