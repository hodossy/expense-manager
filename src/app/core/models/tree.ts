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

export class Tree {
  private nodes: Array<Node>;

  constructor(nodes?: Array<Node>){
    this.nodes = nodes || new Array<Node>();
    this.nodes.map((node: Node) => {
      node.setTree(this);
    }, this);
  };

  get all(): Node[] {
    return this.nodes;
  };

  get root(): Node {
    return this.nodes.find((node: Node): boolean => {
      return node.left === 0;
    });
  }

  public insertNode(node: Node, at: number, lvl: number): void {
    let size = node.right - node.left;
    let shift = at - node.left + 1;
    let newNodes = node.all.map((el: Node) => {
      el.setTree(this);
      el.left += shift;
      el.right += shift;
      el.lvl += lvl + 1;
      return el;
    }, this);
    node.left = at + 1;
    node.right = node.left + size;
    this.nodes = this.nodes.map(this.getShiftRightFn(at, size + 1));
    this.nodes.push(...newNodes);
  };

  public deleteBranch(root: Node): void {
    let size = root.right - root.left;
    this.nodes = this.nodes.filter((el: Node): boolean => {
      return el.left < root.left || root.right < el.right;
    }).map(
      this.getShiftRightFn(root.left, -1 * (size + 1))
    );
  };

  public deleteNode(node: Node): void {
    node.all.map((el: Node) => {
      el.lvl -= 1;
      return el;
    });
    this.nodes = this.nodes.filter((el: Node): boolean => {
      return node.left != el.left;
    }).map(
      this.getShiftRightFn(node.left, -1)
    ).map(
      this.getShiftRightFn(node.right - 1, -1)
    )
  }

  public getBranch(node: Node): Array<Node> {
    return this.nodes.filter((el: Node): boolean => {
      return node.left <= el.left && el.right <= node.right;
    });
  };

  private getShiftRightFn(from: number, step: number) {
    return (el: Node): Node => {
      if(el.right > from) {
        el.right += step;
      }
      if(el.left > from) {
        el.left += step;
      }
      return el;
    };
  };

  private getShiftLeftFn(from: number, step: number) {
    return (el: Node): Node => {
      if(el.right < from) {
        el.right -= step;
      }
      if(el.left < from) {
        el.left -= step;
      }
      return el;
    };
  };

  public getNodesByLvl(lvl: number): Array<Node> {
    return this.nodes.filter((el: Node): boolean => {
      return el.lvl === lvl;
    });
  };
}
