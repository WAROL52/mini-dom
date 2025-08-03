import type { Vdom } from "./vdom";

export function createDom(fiber: Vdom.ElementInfo) {
  if (fiber.type == "TEXT_ELEMENT") {
    return document.createTextNode(fiber.props.nodeValue);
  }
  const dom = document.createElement(fiber.type);
  const { children, ...props } = fiber.props;
  Object.assign(dom, props);

  return dom;
}
