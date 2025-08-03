import type { RState, State } from "../state/state";

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

declare global {
  namespace JSX {
    type ComponentHTMLTagName = keyof HTMLElementTagNameMap;
    type ElementNode =
      | string
      | number
      | boolean
      | State<any>
      | RState
      | string
      | number
      | boolean
      | bigint
      | null
      | undefined
      | Node
      | ElementNode[];

    type ComponentHTMLProps<T extends keyof HTMLElementTagNameMap> = {
      [K in ElPropsKey<T>]?: HTMLElementTagNameMap[T][K];
    } & {
      children?: Children;
      style?: Partial<HTMLElementTagNameMap["div"]["style"]>;
    };
    type ComponentFuncProps<T extends (props: any) => Children> =
      Parameters<T>[0];
    type ComponentProps<T extends ElementType> =
      T extends keyof HTMLElementTagNameMap
        ? ComponentHTMLProps<T>
        : T extends (props: any) => Element
        ? ComponentFuncProps<T>
        : never;
    type PropsWithChildren<T extends Record<any, any> = Record<any, any>> =
      T & {
        children?: Children[];
      };

    type ComponentHTMLElement = {
      [K in ComponentHTMLTagName]: ComponentProps<K>;
    };
    interface IntrinsicElements extends ComponentHTMLElement {}

    interface IntrinsicAttributes {
      key?: string | number;
    }
    interface ElementChildrenAttribute {
      children: {}; // specify children name to use
    }
    type Children = ElementNode | Element;

    type Element<T extends ComponentHTMLTagName = ComponentHTMLTagName> =
      HTMLElementTagNameMap[T];

    type ElementType = keyof IntrinsicElements | ((props: any) => Element);
  }
}
