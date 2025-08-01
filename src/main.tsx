/** @jsx h */
import "./style.css";
import { el, h } from "./mini-dom/el/index.ts";
import { makeEffect, makeMemo, makeState } from "./mini-dom/make/index.ts";

const count = makeState(1);

const count2 = makeMemo(() => count.value * 2);

const span = <span>{count.value}</span>;

const btn = <button onclick={() => count.value++}>click {span} </button>;

el.$("div", "#app")?.appendChild(btn);

const des = makeEffect(() => {
  span.innerHTML = String(count2.value);
});

setInterval(() => {
  btn.click();
}, 1000);
function Compo() {
  return <div>hello</div>;
}
const els = <Compo />;
btn.append(els);
// setupCounter(document.querySelector<HTMLButtonElement>("#counter")!);
