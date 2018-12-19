import { Tree } from './tree';
import { Node } from './node';

describe('Tree', () => {
  it('should create an instance', () => {
    expect(new Tree()).toBeTruthy();
  });

  it('should identify the first root node', () => {
    let tree = new Tree();
    let root = new Node();
    let node = new Node();
    tree.insertNode(root, -1, -1);
    expect(tree.root).toBe(root);
    tree.insertNode(node, 0, 0);
    expect(tree.root).toBe(root);
  });

  describe('insertNode(node: Node): void', () => {
    it('should add the first Node', () => {
      let tree = new Tree();
      let node = new Node();
      tree.insertNode(node, -1, -1);
      expect(tree.all.length).toEqual(1);
      expect(node.tree).toBe(tree);
      expect(node.left).toEqual(0);
      expect(node.right).toEqual(1);
    });

    it('should add a second Node as child', () => {
      let tree = new Tree();
      let root = new Node();
      let node = new Node();
      tree.insertNode(root, -1, -1);
      tree.insertNode(node, 0, 0);
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
      tree.insertNode(root, -1, -1);
      tree.insertNode(node, -1, -1);
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
      tree.insertNode(root, -1, -1);
      tree.insertNode(nodes[0], 0, 0);
      tree.insertNode(nodes[1], 0, 0);
      tree.insertNode(nodes[2], 2, 0);
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
      tree.insertNode(root, -1, -1);
      tree.insertNode(nodes[0], 0, 0);
      tree.insertNode(nodes[1], 0, 0);
      tree.insertNode(nodes[2], 2, 0);
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
      tree.insertNode(root, -1, -1);
      tree.insertNode(nodes[0], 0, 0);
      tree.insertNode(nodes[1], 1, 1);
      tree.insertNode(nodes[2], 1, 1);
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
      tree.insertNode(root, -1, -1);
      tree.insertNode(nodes[0], 0, 0);
      tree.insertNode(nodes[1], 0, 0);
      tree.insertNode(nodes[2], 2, 0);
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
      tree.insertNode(root, -1, -1);
      tree.insertNode(nodes[0], 0, 0);
      tree.insertNode(nodes[1], 1, 1);
      tree.insertNode(nodes[2], 1, 1);
      tree.deleteBranch(nodes[0]);
      expect(tree.all.length).toEqual(1);
      expect(root.left).toEqual(0);
      expect(root.right).toEqual(1);
    });
  });

  describe('getNodesByLvl(lvl: number): Array<Node>', () => {
    let tree: Tree;
    let root: Node;
    let nodes: Array<Node>;

    beforeEach(() => {
      tree = new Tree();
      root = new Node();
      nodes = [new Node(), new Node(), new Node()];
      tree.insertNode(root, -1, -1);
      tree.insertNode(nodes[0], 0, 0);
      tree.insertNode(nodes[1], 1, 1);
      tree.insertNode(nodes[2], 1, 1);
    });

    it('should get root nodes', () => {
      expect(tree.getNodesByLvl(0)).toEqual([root]);
    });

    it('should get lvl 1 nodes', () => {
      expect(tree.getNodesByLvl(1)).toEqual(nodes.slice(0,1));
    });

    it('should get lvl 2 nodes', () => {
      expect(tree.getNodesByLvl(2)).toEqual(nodes.slice(1));
    });
  });
});
