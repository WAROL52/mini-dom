import { createDom } from "./dom";
import { wip } from "./work-loop";

type HTMLNode = Node;
export namespace Vdom {
  export type Element = HTMLNode;
  export type ElementEvent = {
    mounted: Set<() => void>;
  };
  export type ElementInfo = {
    dom: HTMLNode | null;
    type: Type;
    props: Record<any, any> & {
      children: ElementInfo[];
    };
    eventListeners: ElementEvent;
  };
  export type Node = string | Element;
  export type TypeText = "TEXT_ELEMENT";
  export type TypeHtml = keyof HTMLElementTagNameMap;
  export type Type = TypeText | TypeHtml;
  export type Fiber = {
    dom: HTMLNode;
    eventListeners: ElementEvent;
    type?: Type;
    parent?: Fiber;
    child?: Fiber;
    sibling?: Fiber;
    props: Record<any, any> & {
      children: ElementInfo[];
    };
  };
  export type Wip = {
    nextUnitOfWork: Fiber | null;
    wipRoot: Fiber | null;
    domMap: Map<HTMLNode, ElementInfo>;
  };
}

export function createElement(
  type: Vdom.Type,
  props: Record<any, any>,
  ...children: Vdom.Node[]
): Vdom.Element {
  const initialProps: Vdom.ElementInfo = {
    type,
    dom: null,
    eventListeners: {
      mounted: new Set(),
    },
    props: {
      ...props,
      children: children.map((child) => {
        if (typeof child == "object") {
          return wip.domMap.get(child)!;
        }
        return createTextElement(String(child));
      }),
    },
  };
  const dom = createDom(initialProps);
  initialProps.dom = dom;
  wip.domMap.set(dom, initialProps);
  return dom;
}

export function createTextElement(content: string) {
  const initialProps: Vdom.ElementInfo = {
    type: "TEXT_ELEMENT",
    dom: null,
    eventListeners: {
      mounted: new Set(),
    },
    props: {
      nodeValue: content,
      children: [],
    },
  };
  const dom = createDom(initialProps);
  initialProps.dom = dom;
  wip.domMap.set(dom, initialProps);
  return initialProps;
}
