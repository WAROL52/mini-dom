import { commitRoot } from "./commit";
import { createDom } from "./dom";
import type { Vdom } from "./vdom";

const option: IdleRequestOptions = {
  timeout: 0,
};
requestIdleCallback(workLoop, option);
export const wip: Vdom.Wip = {
  nextUnitOfWork: null,
  wipRoot: null,
  domMap: new Map(),
};

function workLoop(deadline: IdleDeadline) {
  let shouldYeld = deadline.timeRemaining() > 1;
  while (wip.nextUnitOfWork && shouldYeld) {
    wip.nextUnitOfWork = performUnitOfWork(wip.nextUnitOfWork);
    shouldYeld = deadline.timeRemaining() > 1;
  }
  if (!wip.nextUnitOfWork && wip.wipRoot) {
    commitRoot();
  }
  requestIdleCallback(workLoop, option);
}

function performUnitOfWork(fiber: Vdom.Fiber) {
  //   if (!fiber.dom) {
  //     fiber.dom = createDom(fiber);
  //   }
  //   if (fiber.parent && fiber.parent.dom) {
  //     fiber.parent.dom.appendChild(fiber.dom);
  //   }
  const elements = fiber.props.children;
  let index = 0;
  let prevSibling: Vdom.Fiber | null = null;
  while (index < elements.length) {
    const element = elements[index];
    if (!element.dom) continue;
    const newFiber: Vdom.Fiber = {
      ...element,
      dom: element.dom,
      parent: fiber,
    };
    if (index == 0) {
      fiber.child = newFiber;
    } else {
      if (prevSibling) prevSibling.sibling = newFiber;
    }
    prevSibling = newFiber;
    index++;
  }
  if (fiber.child) {
    return fiber.child;
  }
  let nextFiber: Vdom.Fiber | undefined = fiber;
  while (nextFiber) {
    if (nextFiber.sibling) {
      return nextFiber.sibling;
    }
    nextFiber = nextFiber.parent;
  }

  return null;
}
