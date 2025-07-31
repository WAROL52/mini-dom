type ElPropsKeyIncludedStart = "on" | "aria";
type ElPropsKeyExcludedStart =
  | "form"
  | "next"
  | "node"
  | "previous"
  | "is"
  | "owner"
  | "parent"
  | "last";
type ElPropsKeyExcluded =
  | "children"
  | "labels"
  | "childNodes"
  | "attributes"
  | "style"
  | "outerText"
  | "childElementCount"
  | "firstElementChild"
  | "attributeStyleMap"
  | "firstChild"
  | "shadowRoot"
  | "classList"
  | "assignedSlot";
type ElPropsKeyExcludedType = (
  ...arg: any
) =>
  | any
  | Node
  | Node[]
  | ChildNode
  | NodeListOf<HTMLLabelElement>
  | DOMTokenList
  | StylePropertyMap
  | HTMLSlotElement
  | Document
  | Element
  | NamedNodeMap
  | HTMLSlotElement
  | NodeListOf<ChildNode>;

type ElPropsKey<
  T extends keyof HTMLElementTagNameMap,
  K extends keyof HTMLElementTagNameMap[T] = keyof HTMLElementTagNameMap[T]
> = K extends `${ElPropsKeyIncludedStart}${infer _Include}`
  ? K
  : K extends `${ElPropsKeyExcludedStart}${infer _Include}`
  ? never
  : K extends ElPropsKeyExcluded
  ? never
  : K extends Uppercase<K & string>
  ? never
  : HTMLElementTagNameMap[T][K] extends ElPropsKeyExcludedType
  ? never
  : K;

export type ElProps<T extends keyof HTMLElementTagNameMap> = {
  [K in ElPropsKey<T>]?: HTMLElementTagNameMap[T][K];
} & {
  children?: (string | number | boolean | bigint | null | undefined | Node)[];
  style?: Partial<HTMLElementTagNameMap["div"]["style"]>;
};
export function el<K extends keyof HTMLElementTagNameMap>(
  tagName: K,
  props: ElProps<K> = {}
): HTMLElementTagNameMap[K] {
  const { children, style = {}, ...elProps } = props;
  const instance = document.createElement(tagName);
  Object.assign(instance, elProps);
  Object.assign(instance.style, style);
  if (children) {
    instance.innerHTML = "";
    instance.append(
      ...(children.filter((c) =>
        c instanceof Node ? c : (String(c) as string | Node)
      ) as string[])
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
