import { makeEffect, State } from "../make";
import type { ComponentProps } from "./type";

export function el<K extends keyof HTMLElementTagNameMap>(
  tagName: K,
  props: ComponentProps<K> = {}
): HTMLElementTagNameMap[K] {
  const { children, style = {}, ...elProps } = props;
  const instance = document.createElement(tagName);
  Object.assign(instance, elProps);
  Object.assign(instance.style, style);
  if (children) {
    instance.innerHTML = "";
    instance.append(
      ...(children.map((c) => {
        if (c instanceof State) {
          const text = document.createTextNode("");
          makeEffect(() => {
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

el.$ = function querySelector<K extends keyof HTMLElementTagNameMap>(
  tagName: K,
  selectors: string
) {
  const element = document.querySelector<HTMLElementTagNameMap[K]>(selectors);

  if (!element || tagName.toUpperCase() !== element.tagName.toUpperCase())
    return null;
  return element;
};

export function h(tagName: JSX.ElementType, props: any, ...children: any[]) {
  if (typeof tagName == "function") {
    return tagName({ ...props, children });
  }
  return el(tagName, { ...props, children });
}
