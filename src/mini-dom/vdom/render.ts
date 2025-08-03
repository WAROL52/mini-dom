import type { Vdom } from "./vdom";

export function render(element: Vdom.Element, container: Node) {
  if (element.type == "TEXT_ELEMENT") {
    const dom = document.createTextNode(element.props.nodeValue);
    container.appendChild(dom);
    return;
  }
  const dom = document.createElement(element.type);
  const { children, ...props } = element.props;
  Object.assign(dom, props);
  children.map((child) => {
    render(child, dom);
  });

  container.appendChild(dom);
}
