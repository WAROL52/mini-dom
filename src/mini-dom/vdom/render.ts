import type { Vdom } from "./vdom";
import { wip } from "./work-loop";

export function render(element: Vdom.Element, container: Node) {
  const nextUnitOfWork: Vdom.Fiber = {
    dom: container,
    props: {
      children: [element],
    },
  };
  wip.nextUnitOfWork = nextUnitOfWork;
  wip.wipRoot = nextUnitOfWork;
}
