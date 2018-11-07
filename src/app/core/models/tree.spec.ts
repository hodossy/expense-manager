import {Node, Tree} from './tree';

describe('Node', () => {
  it('should create an instance', () => {
    expect(new Node()).toBeTruthy();
  });

  it('should avoid circular reference when serializing', () => {
    let node = new Node();
    expect(node.toJSON()['tree']).toBeUndefined();
  });

  describe('addChild(child: Node): void', () => {
    it('should add a child', () => {
      let root = new Node();
      root.addChild(new Node());
      expect(root.tree).toBeTruthy();
      expect(root.tree.all.length).toEqual(2);
      expect(root.right).toEqual(3);
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
        '{"nodes":[{"left":0,"right":21},{"left":11,"right":20},{"left":5,"right":10},\
{"left":1,"right":4},{"left":14,"right":19},{"left":12,"right":13},{"left":6,"right":9},\
{"left":2,"right":3},{"left":17,"right":18},{"left":15,"right":16},{"left":7,"right":8}]}'
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
        '{"nodes":[{"left":0,"right":23},{"left":13,"right":22},{"left":9,"right":12},\
{"left":16,"right":21},{"left":14,"right":15},{"left":10,"right":11},{"left":19,"right":20},\
{"left":17,"right":18},{"left":1,"right":8},{"left":2,"right":7},{"left":5,"right":6},{"left":3,"right":4}]}'
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
        '{"nodes":[{"left":0,"right":9},{"left":3,"right":8},{"left":1,"right":2},{"left":6,"right":7},{"left":4,"right":5}]}'
      );
    });
  });

});

describe('Tree', () => {
  it('should create an instance', () => {
    expect(new Tree()).toBeTruthy();
  });

  it('should identify the first root node', () => {
    let tree = new Tree();
    let root = new Node();
    let node = new Node();
    tree.insertNode(root, -1);
    expect(tree.root).toBe(root);
    tree.insertNode(node, 0);
    expect(tree.root).toBe(root);
  });

  describe('insertNode(node: Node): void', () => {
    it('should add the first Node', () => {
      let tree = new Tree();
      let node = new Node();
      tree.insertNode(node, -1);
      expect(tree.all.length).toEqual(1);
      expect(node.tree).toBe(tree);
      expect(node.left).toEqual(0);
      expect(node.right).toEqual(1);
    });

    it('should add a second Node as child', () => {
      let tree = new Tree();
      let root = new Node();
      let node = new Node();
      tree.insertNode(root, -1);
      tree.insertNode(node, 0);
      expect(tree.all.length).toEqual(2);
      expect(node.tree).toBe(tree);
      expect(root.left).toEqual(0);
      expect(root.right).toEqual(3);
      expect(node.left).toEqual(1);
      expect(node.right).toEqual(2);
    });

    it('should add a second Node as sibling', () => {
      let tree = new Tree();
      let root = new Node();
      let node = new Node();
      tree.insertNode(root, -1);
      tree.insertNode(node, -1);
      expect(tree.all.length).toEqual(2);
      expect(node.tree).toBe(tree);
      expect(root.left).toEqual(2);
      expect(root.right).toEqual(3);
      expect(node.left).toEqual(0);
      expect(node.right).toEqual(1);
    });

    it('should add a Node as second child', () => {
      let tree = new Tree();
      let root = new Node();
      let nodes = [new Node(), new Node(), new Node()];
      tree.insertNode(root, -1);
      tree.insertNode(nodes[0], 0);
      tree.insertNode(nodes[1], 0);
      tree.insertNode(nodes[2], 2);
      expect(tree.all.length).toEqual(4);
      expect(nodes[2].left).toEqual(3);
      expect(nodes[2].right).toEqual(4);
      expect(nodes[1].left).toEqual(1);
      expect(nodes[1].right).toEqual(2);
      expect(nodes[0].left).toEqual(5);
      expect(nodes[0].right).toEqual(6);
    });
  });

  describe('deleteNode(node: Node): void', () => {
    it('should delete a leaf Node', () => {
      let tree = new Tree();
      let root = new Node();
      let nodes = [new Node(), new Node(), new Node()];
      tree.insertNode(root, -1);
      tree.insertNode(nodes[0], 0);
      tree.insertNode(nodes[1], 0);
      tree.insertNode(nodes[2], 2);
      tree.deleteNode(nodes[1]);
      expect(tree.all.length).toEqual(3);
      expect(nodes[2].left).toEqual(1);
      expect(nodes[2].right).toEqual(2);
      expect(nodes[1].left).toEqual(1);
      expect(nodes[1].right).toEqual(2);
      expect(nodes[0].left).toEqual(3);
      expect(nodes[0].right).toEqual(4);
    });

    it('should delete a branch Node without its branch', () => {
      let tree = new Tree();
      let root = new Node();
      let nodes = [new Node(), new Node(), new Node()];
      tree.insertNode(root, -1);
      tree.insertNode(nodes[0], 0);
      tree.insertNode(nodes[1], 1);
      tree.insertNode(nodes[2], 1);
      tree.deleteNode(nodes[0]);
      expect(tree.all.length).toEqual(3);
      expect(nodes[2].left).toEqual(1);
      expect(nodes[2].right).toEqual(2);
      expect(nodes[1].left).toEqual(3);
      expect(nodes[1].right).toEqual(4);
    });
  });

  describe('deleteBranch(node: Node): void', () => {
    it('should delete a leaf Node', () => {
      let tree = new Tree();
      let root = new Node();
      let nodes = [new Node(), new Node(), new Node()];
      tree.insertNode(root, -1);
      tree.insertNode(nodes[0], 0);
      tree.insertNode(nodes[1], 0);
      tree.insertNode(nodes[2], 2);
      tree.deleteBranch(nodes[1]);
      expect(tree.all.length).toEqual(3);
      expect(nodes[2].left).toEqual(1);
      expect(nodes[2].right).toEqual(2);
      expect(nodes[1].left).toEqual(1);
      expect(nodes[1].right).toEqual(2);
      expect(nodes[0].left).toEqual(3);
      expect(nodes[0].right).toEqual(4);
    });

    it('should delete a whole branch', () => {
      let tree = new Tree();
      let root = new Node();
      let nodes = [new Node(), new Node(), new Node()];
      tree.insertNode(root, -1);
      tree.insertNode(nodes[0], 0);
      tree.insertNode(nodes[1], 1);
      tree.insertNode(nodes[2], 1);
      tree.deleteBranch(nodes[0]);
      expect(tree.all.length).toEqual(1);
      expect(root.left).toEqual(0);
      expect(root.right).toEqual(1);
    });
  });
});
