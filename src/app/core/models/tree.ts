export class Node {
  public tree: Tree | null;
  public left: number = 0;
  public right: number = 1;

  public addChild(child: Node) {
    if(!this.tree) {
      this.tree = new Tree([this, ]);
    }
    this.tree.insertNode(child, this.left);
  };

  get all(): Array<Node> {
    return this.tree ? this.tree.getBranch(this) : [this, ];
  };

  public remove() {
    this.tree.deleteNode(this);
  }

  public removeBranch() {
    this.tree.deleteBranch(this);
  }

  get isLeaf(): boolean {
    return this.right - this.left == 1;
  };

  public setTree(tree: Tree): void {
    this.tree = tree;
  };

  toJSON() {
    let obj = {};
    Object.keys(this).forEach((key: string) =>{
      if(key != 'tree') {
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
  };

  get all(): Node[] {
    return this.nodes;
  };

  public insertNode(node: Node, at: number): void {
    let size = node.right - node.left;
    let shift = at - node.left + 1;
    let newNodes = node.all.map((el: Node) => {
      el.setTree(this);
      el.left += shift;
      el.right += shift;
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

  private getShiftRightFn(from: number, step: number): void {
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

  private getShiftLeftFn(from: number, step: number): void {
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

  public getNodeLvl(node: Node): number {
    return this.nodes.filter((el: Node): boolean => {
      return el.left < node.left && node.right < el.right;
    }).length;
  };
}
