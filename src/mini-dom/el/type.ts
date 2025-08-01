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

export type ComponentHTMLTagName = keyof HTMLElementTagNameMap;

export type ComponentProps<T extends ComponentHTMLTagName> = {
  [K in ElPropsKey<T>]?: HTMLElementTagNameMap[T][K];
} & {
  children?: (string | number | boolean | bigint | null | undefined | Node)[];
  style?: Partial<HTMLElementTagNameMap["div"]["style"]>;
};

export type ComponentHTMLElement = {
  [K in ComponentHTMLTagName]: ComponentProps<K>;
};

declare global {
  namespace JSX {
    interface IntrinsicElements extends ComponentHTMLElement {}

    interface IntrinsicAttributes {
      key?: string | number;
    }

    type ElementClass = {
      render: () => Element;
    };

    type Element = HTMLElement;
    // type Element = {
    //   type: ElementType;
    //   props: Record<string, any>;
    //   key: string | null;
    // };

    type ElementType = keyof IntrinsicElements | ((props: any) => Element);
  }
}
