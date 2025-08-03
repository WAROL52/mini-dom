const list: {
  parent: Node;
  child: Node;
  props?: Record<any, any>;
}[] = [];

requestIdleCallback(workLoop);

function workLoop(deadline: IdleDeadline) {
  while (deadline.timeRemaining() > 1) {
    const node = list.shift();
    if (node) {
      assignProps(node.child, node.props);
      appendChild(node.parent, node.child);
    }
  }
  requestIdleCallback(workLoop);
}

function appendChild(parent: Node, child: Node) {
  parent.appendChild(child);
}

function assignProps(child: Node, props?: Record<any, any>) {
  Object.assign(child, props);
}

export function render(
  parent: HTMLElement,
  child: HTMLElement,
  props?: Record<any, any>
) {
  list.push({
    parent,
    child,
    props,
  });
}
