import { Node } from './node';
import { NodeService } from './node.service';

class TestService extends NodeService<Node> {
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
    expect(service.all.length).toEqual(4);
  });
});
