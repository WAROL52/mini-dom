import type { Vdom } from "./vdom";
import { wip } from "./work-loop";

function commitWork(fiber?: Vdom.Fiber) {
  if (!fiber) return;
  const domParent = fiber.parent?.dom;
  const domChild = fiber.dom;
  if (domParent && domChild) {
    domParent.appendChild(domChild);
    fiber.eventListeners.mounted.forEach((fn) => fn());
  }
  commitWork(fiber.child);
  commitWork(fiber.sibling);
}
export function commitRoot() {
  if (wip.wipRoot) {
    commitWork(wip.wipRoot);
  }
  console.log(wip);

  wip.wipRoot = null;
}
