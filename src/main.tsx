import "./style.css";
import typescriptLogo from "./typescript.svg";
import viteLogo from "/vite.svg";
// import { setupCounter } from "./counter.ts";
import { el } from "./mini-dom/el/index.ts";
import { makeEffect, makeState } from "./mini-dom/make/index.ts";

// document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
//   <div>
//     <a href="https://vite.dev" target="_blank">
//       <img src="${viteLogo}" class="logo" alt="Vite logo" />
//     </a>
//     <a href="https://www.typescriptlang.org/" target="_blank">
//       <img src="${typescriptLogo}" class="logo vanilla" alt="TypeScript logo" />
//     </a>
//     <h1>Vite + TypeScript</h1>
//     <div class="card">
//       <button id="counter" type="button"></button>
//     </div>
//     <p class="read-the-docs">
//       Click on the Vite and TypeScript logos to learn more
//     </p>
//   </div>
// `;

const count = makeState(10);
const btn = el("button", {
  className: "text-red-400 gregerg",
  onclick(ev) {
    console.log("click");
    count.value++;
  },
  style: {
    color: "red",
    background: "green",
  },
  children: [count.value],
});

el.$("div", "#app")?.appendChild(btn);

function h<K extends keyof HTMLElementTagNameMap>(
  tagName: K,
  props: any,
  ...children: any[]
) {
  return el(tagName, { ...props, children });
}

makeEffect(() => {
  btn.innerHTML = "";
  btn.appendChild(
    <div onclick={() => console.log("click span")}>
      hello <span>je suis {count.value} un span</span>{" "}
    </div>
  );
});

// setupCounter(document.querySelector<HTMLButtonElement>("#counter")!);
