import { Node } from './node';
import { NodeService } from './node.service';

class TestService extends NodeService<Node> {
  fromJSON() {
    return new Node();
  }
}

describe('NodeService', () => {
  let root: Node;

  beforeEach(() => {
    root = new Node();
    root.addChild(new Node());
    root.addChild(new Node());
    root.addChild(new Node());
  });

  it('should set the root node', () => {
    let service = new TestService();
    service.setRoot(root);
    service.all$.subscribe((nodes: Node[]) => {
      expect(nodes.length).toEqual(4);
    })
  });
});
