/** @jsx h */
import "./style.css";
import { el, h } from "./mini-dom/el/index.ts";
import {
  makeEffect,
  makeMemo,
  makeState,
  State,
} from "./mini-dom/make/index.ts";

function Button({ name, index }: { name: string; index: State<number> }) {
  const count = makeState(1);
  return (
    <button onclick={() => count.value++}>
      hello {name} {count} {index}
    </button>
  );
}

const index = makeState(0);

const els = <Button name="rolio" index={index} />;

setInterval(() => {
  index.value++;
}, 1000);

el.$("div", "#app")?.appendChild(els);

// setupCounter(document.querySelector<HTMLButtonElement>("#counter")!);
