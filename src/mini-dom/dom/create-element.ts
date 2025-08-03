"use client";

import { createEffect } from "../state";
import { State } from "../state/state";

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
    instance.append(
      ...(childrens.map((c) => {
        if (c instanceof State) {
          const text = document.createTextNode("");
          createEffect(() => {
            text.textContent = String(c.value);
          });
          return text;
        }
        return c instanceof Node ? c : (String(c) as string | Node);
      }) as string[])
    );
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
