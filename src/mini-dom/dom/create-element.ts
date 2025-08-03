"use client";

import { createEffect } from "../state";
import { State } from "../state/state";
import { render } from "./render";

function createElementHTML<K extends keyof HTMLElementTagNameMap>(
  tagName: K,
  props: JSX.ComponentHTMLProps<K>
): HTMLElementTagNameMap[K] {
  const { children, style = {}, ...elProps } = props;
  const instance = document.createElement(tagName);
  Object.assign(instance, elProps);
  Object.assign(instance.style, style);
  if (children) {
    instance.innerHTML = "";
    let childrens: JSX.Children[] = [];
    if (!Array.isArray(children)) {
      childrens = [children];
    } else childrens = children;
    const childs = childrens
      .flat()
      .map((c) => {
        if (c instanceof State) {
          const text = document.createTextNode("");
          createEffect(() => {
            text.textContent = String(c.value);
          });
          return text;
        }
        if (c instanceof Node) {
          return c;
        }
        return document.createTextNode(String(c));
      })
      .flat();
    instance.append(...childs);
  }

  return instance;
}

export function createElement<T extends JSX.ElementType>(
  tagName: T,
  props: JSX.ComponentProps<T>,
  ...children: JSX.Children[]
): T extends keyof HTMLElementTagNameMap
  ? HTMLElementTagNameMap[T]
  : T extends (props: any) => JSX.Element
  ? JSX.Element
  : JSX.Element {
  if (typeof tagName == "function") {
    // @ts-ignore
    return tagName({ ...props, children });
  }
  // @ts-ignore
  return createElementHTML(tagName, { ...props, children });
}
