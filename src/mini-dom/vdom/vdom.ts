export namespace Vdom {
  export type Element = {
    type: Type;
    props: Record<any, any> & {
      children: Element[];
    };
  };
  export type Node = string | Element;
  export type TypeText = "TEXT_ELEMENT";
  export type TypeHtml = keyof HTMLElementTagNameMap;
  export type Type = TypeText | TypeHtml;
}

export function createElement(
  type: Vdom.Type,
  props: Record<any, any>,
  ...children: Vdom.Node[]
): Vdom.Element {
  return {
    type,
    props: {
      ...props,
      children: children.map((child) => {
        if (typeof child == "object") {
          return child;
        }
        return createTextElement(String(child));
      }),
    },
  };
}

export function createTextElement(content: string): Vdom.Element {
  return {
    type: "TEXT_ELEMENT",
    props: {
      nodeValue: content,
      children: [],
    },
  };
}
