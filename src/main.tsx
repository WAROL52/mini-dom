// import "./style.css";
// import { render } from "./mini-dom/dom/render.ts";
// const t1 = Date.now();
// const element = (
//   <div id="foo">
//     <h1>Bienvenue sur le site</h1>
//     {Array.from({ length: 1024 * 100 }).map(function loopMap(_, index) {
//       return (
//         <div>
//           element <span>{index + 1}</span>
//         </div>
//       );
//     })}
//   </div>
// );
// const root = document.querySelector<HTMLElement>("#app");
// const root0 = document.querySelector<HTMLElement>("#app0");

import { render } from "./mini-dom/vdom/render";

// if (root) {
//   render(root, element);
// }
// const t2 = Date.now();
// const res = (
//   <div>
//     <div>start:{t1}</div>
//     <div>end:{t2}</div>
//     <div>diff: {t2 - t1}ms</div>
//   </div>
// );

// if (root0) {
//   root0?.appendChild(res);
//   console.log("adding");
// }
declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: any;
    }
    interface ElementChildrenAttribute {
      children: Element;
    }
    interface IntrinsicAttributes {
      key?: string | number;
    }
  }
}
const element = (
  <div id="foo">
    <h1>Bienvenue sur le site</h1>
    <a href="#">En savoir plus</a>
  </div>
);
render(element, document.body.firstElementChild!);
console.log(element);
