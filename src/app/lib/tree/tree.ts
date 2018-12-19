import { Node } from './node';

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
