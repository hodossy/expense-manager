import { Tree } from './tree';

export class Node {
  public tree: Tree | null;
  public left: number = 0;
  public right: number = 1;
  public lvl: number = 0;
  protected skip: Array<string> = ['skip', 'tree'];

  public addChild(child: Node) {
    if(!this.tree) {
      this.tree = new Tree([this, ]);
    }
    this.tree.insertNode(child, this.left, this.lvl);
  };

  get all(): Array<Node> {
    return this.tree ? this.tree.getBranch(this) : [this, ];
  };

  get children(): Array<Node> {
    return this.tree.getNodesByLvl(this.lvl + 1).filter((el: Node) => {
      return this.left < el.left && el.right < this.right;
    }, this);
  }

  get parent(): Node {
    return this.tree.getNodesByLvl(this.lvl - 1).filter((el: Node) => {
      return el.left < this.left && this.right < el.right;
    }, this).shift(); //there can only be one such element
  }

  public remove(): void {
    this.tree.deleteNode(this);
    this.reset();
  }

  public removeBranch(): void {
    let branch = this.all;
    let shift = this.left;
    let old_lvl = this.lvl;
    this.tree.deleteBranch(this);
    let newTree = new Tree(branch);
    branch.map((el: Node): Node => {
      el.left -= shift;
      el.right -= shift;
      el.lvl -= old_lvl;
      return el
    });
  }

  get isLeaf(): boolean {
    return this.right - this.left == 1;
  };

  private reset(): void {
    this.left = 0;
    this.right = 1;
    this.tree = undefined;
  };

  public setTree(tree: Tree): void {
    this.tree = tree;
  };

  toJSON() {
    let obj = {};
    Object.keys(this).forEach((key: string) =>{
      if(!this.skip.includes(key)) {
        obj[key] = this[key];
      }
    }, this);
    return obj;
  }
}
