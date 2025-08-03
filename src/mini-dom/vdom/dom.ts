import type { Vdom } from "./vdom";

export function createDom(fiber: Vdom.Fiber) {
  if (!fiber.type) {
    return fiber.dom!;
  }
  if (fiber.type == "TEXT_ELEMENT") {
    return document.createTextNode(fiber.props.nodeValue);
  }
  const dom = document.createElement(fiber.type);
  const { children, ...props } = fiber.props;
  Object.assign(dom, props);

  return dom;
}
