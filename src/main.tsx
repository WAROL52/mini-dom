import "./style.css";
import { createEffect, createState } from "./mini-dom/state/index.ts";
import type { State } from "./mini-dom/state/state.ts";
import { For } from "@/mini-dom/dom/for.tsx";
import { createElement } from "./mini-dom/dom/create-element.ts";
function Button({
  name,
  index,
}: JSX.PropsWithChildren<{
  name: string;
  index: State<number>;
}>) {
  const count = createState(1);
  createEffect(() => {
    console.log("value", count.value);
  });
  return (
    <button onclick={() => count.value++} value="sfesfsf">
      hello {name} {count} {index}
      <span>ca marche</span>
    </button>
  );
}
const index = createState(0);
const els = (
  <Button name="rolio" index={index}>
    {["tegr"]}
  </Button>
);

els.onchange = console.log;

setInterval(() => {
  index.value++;
}, 1000);

// setupCounter(document.querySelector<HTMLButtonElement>("#counter")!);
const input: JSX.Element = (
  <a>
    efef
    <For />
  </a>
);
input;

const input2 = createElement("span", {}, "je suis un enfant");

document.querySelector("#app")?.append(els, input2);
