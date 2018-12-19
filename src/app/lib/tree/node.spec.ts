import { Tree } from './tree';
import { Node } from './node';

describe('Node', () => {
  it('should create an instance', () => {
    expect(new Node()).toBeTruthy();
  });

  it('should avoid circular reference when serializing', () => {
    let node = new Node();
    expect(node.toJSON()['tree']).toBeUndefined();
  });

  it('should identify its parent', () => {
    let root = new Node();
    let node1 = new Node();
    root.addChild(node1);
    expect(node1.parent).toBe(root);
    expect(root.parent).toBeUndefined();
  });

  it('should identify its children', () => {
    let root = new Node();
    let node1 = new Node();
    let node2 = new Node();
    root.addChild(node1);
    root.addChild(node2);
    expect(root.children).toEqual([node1, node2]);
    expect(node1.children).toEqual([]);
  });

  it('should tell if it is a leaf itself', () => {
    let root = new Node();
    let node1 = new Node();
    root.addChild(node1);
    expect(root.isLeaf).toBeFalsy();
    expect(node1.isLeaf).toBeTruthy();
  });

  describe('addChild(child: Node): void', () => {
    it('should add a child', () => {
      let root = new Node();
      let node1 = new Node();
      root.addChild(node1);
      expect(root.tree).toBeTruthy();
      expect(root.all.length).toEqual(2);
      expect(root.right).toEqual(3);
      expect(root.lvl).toEqual(0);
      expect(node1.lvl).toEqual(1);
    });

    it('should add children', () => {
      let root = new Node();
      let node1 = new Node();
      let node2 = new Node();
      root.addChild(node1);
      root.addChild(node2);
      expect(root.right).toEqual(5);
      expect(node1.right).toEqual(4);
      expect(node2.right).toEqual(2);
      expect(node2.lvl).toEqual(1);
    });

    it('should be able to build a complex tree structure', () => {
      let root = new Node();
      let nodes = [ // 10 node to build a structure
        new Node(), new Node(), new Node(), new Node(), new Node(),
        new Node(), new Node(), new Node(), new Node(), new Node()
      ];
      root.addChild(nodes[0]);
      root.addChild(nodes[1]);
      root.addChild(nodes[2]);
      nodes[0].addChild(nodes[3]);
      nodes[0].addChild(nodes[4]);
      nodes[1].addChild(nodes[5]);
      nodes[2].addChild(nodes[6]);
      nodes[3].addChild(nodes[7]);
      nodes[3].addChild(nodes[8]);
      nodes[5].addChild(nodes[9]);
      expect(root.tree.all.length).toEqual(11);
      expect(JSON.stringify(root.tree)).toEqual(
        '{"nodes":[{"left":0,"right":21,"lvl":0},{"left":11,"right":20,"lvl":1},{"left":5,"right":10,"lvl":1},' +
        '{"left":1,"right":4,"lvl":1},{"left":14,"right":19,"lvl":2},{"left":12,"right":13,"lvl":2},' +
        '{"left":6,"right":9,"lvl":2},{"left":2,"right":3,"lvl":2},{"left":17,"right":18,"lvl":3},' +
        '{"left":15,"right":16,"lvl":3},{"left":7,"right":8,"lvl":3}]}'
      );
    });

    it('should be able to merge complex tree structures', () => {
      let root1 = new Node();
      let root2 = new Node();
      let nodes = [ // 10 node to build a structure
        new Node(), new Node(), new Node(), new Node(), new Node(),
        new Node(), new Node(), new Node(), new Node(), new Node()
      ];
      root1.addChild(nodes[0]);
      root1.addChild(nodes[1]);
      root2.addChild(nodes[2]);
      nodes[0].addChild(nodes[3]);
      nodes[0].addChild(nodes[4]);
      nodes[1].addChild(nodes[5]);
      nodes[2].addChild(nodes[6]);
      nodes[2].addChild(nodes[7]);
      nodes[3].addChild(nodes[8]);
      nodes[3].addChild(nodes[9]);
      root1.addChild(root2);
      expect(root1.tree.all.length).toEqual(12);
      expect(JSON.stringify(root1.tree)).toEqual(
        '{"nodes":[{"left":0,"right":23,"lvl":0},{"left":13,"right":22,"lvl":1},{"left":9,"right":12,"lvl":1},' +
        '{"left":16,"right":21,"lvl":2},{"left":14,"right":15,"lvl":2},{"left":10,"right":11,"lvl":2},' +
        '{"left":19,"right":20,"lvl":3},{"left":17,"right":18,"lvl":3},{"left":1,"right":8,"lvl":1},' +
        '{"left":2,"right":7,"lvl":2},{"left":5,"right":6,"lvl":3},{"left":3,"right":4,"lvl":3}]}'
      );
    });
  });

  describe('remove(): void', () => {
    let root: Node;
    let nodes: Array<Node>;

    beforeEach(() => {
      root = new Node();
      nodes = [ // 10 node to build a structure
        new Node(), new Node(), new Node(), new Node(), new Node(),
        new Node(), new Node(), new Node(), new Node(), new Node()
      ];
      root.addChild(nodes[1]);
      root.addChild(nodes[0]);
      root.addChild(nodes[2]);
      nodes[0].addChild(nodes[3]);
      nodes[0].addChild(nodes[4]);
      nodes[1].addChild(nodes[5]);
      nodes[2].addChild(nodes[6]);
      nodes[3].addChild(nodes[7]);
      nodes[3].addChild(nodes[8]);
      nodes[5].addChild(nodes[9]);
    });

    it('should reset the Node', () => {
      nodes[7].remove();
      expect(nodes[7].tree).toBeUndefined();
      expect(nodes[7].left).toEqual(0);
      expect(nodes[7].right).toEqual(1);
    });

    it('should remove a leaf', () => {
      nodes[7].remove();
      expect(root.all.length).toEqual(10);
    });

    it('should remove a branch root without the branch', () => {
      nodes[0].remove();
      expect(root.all.length).toEqual(10);
    });
  });

  describe('removeBranch(): void', () => {
    let root: Node;
    let nodes: Array<Node>;

    beforeEach(() => {
      root = new Node();
      nodes = [ // 10 node to build a structure
        new Node(), new Node(), new Node(), new Node(), new Node(),
        new Node(), new Node(), new Node(), new Node(), new Node()
      ];
      root.addChild(nodes[1]);
      root.addChild(nodes[0]);
      root.addChild(nodes[2]);
      nodes[0].addChild(nodes[3]);
      nodes[0].addChild(nodes[4]);
      nodes[1].addChild(nodes[5]);
      nodes[2].addChild(nodes[6]);
      nodes[3].addChild(nodes[7]);
      nodes[3].addChild(nodes[8]);
      nodes[5].addChild(nodes[9]);
    });

    it('should reset the tree reference', () => {
      nodes[7].remove();
      expect(nodes[7].tree).toBeUndefined();
      expect(nodes[7].left).toEqual(0);
      expect(nodes[7].right).toEqual(1);
    });

    it('should remove a leaf', () => {
      nodes[7].remove();
      expect(root.all.length).toEqual(10);
    });

    it('should remove a branch root with its branch', () => {
      nodes[0].removeBranch();
      expect(root.all.length).toEqual(6);
    });

    it('should create a tree for the removed branch', () => {
      nodes[0].removeBranch();
      expect(nodes[0].tree).not.toBe(root.tree);
      expect(nodes[0].tree).toBeTruthy();
      expect(JSON.stringify(nodes[0].tree)).toEqual(
        '{"nodes":[{"left":0,"right":9,"lvl":0},{"left":3,"right":8,"lvl":1},{"left":1,"right":2,"lvl":1},' +
        '{"left":6,"right":7,"lvl":2},{"left":4,"right":5,"lvl":2}]}'
      );
    });
  });

});
