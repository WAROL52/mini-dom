import type { Vdom } from "./vdom";
import { wip } from "./work-loop";

export function render(element: Vdom.Element, container: Node) {
  const child = wip.domMap.get(element);
  if (!child) {
    return;
  }

  const nextUnitOfWork: Vdom.Fiber = {
    eventListeners: {
      mounted: new Set(),
    },
    dom: container,
    props: {
      children: [child],
    },
  };
  wip.nextUnitOfWork = nextUnitOfWork;
  wip.wipRoot = nextUnitOfWork;
}

export function onMounted(node: Node, fn: () => void) {
  const info = wip.domMap.get(node);
  if (!info) {
    return;
  }
  info.eventListeners.mounted.add(fn);
}
