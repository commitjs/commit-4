import { directive, AttributePart, EventPart } from "lit-html";

const container = {
  collection: new WeakMap(),
  subs: new WeakMap(),
  set(dir: any, element: any) {
    this.collection.set(dir, element);
    const currentSubs = this.subs.get(dir) || [];
    currentSubs.forEach((fn: any) => fn(element));
  },
  subscribe: function (dir: any, fn: any) {
    const currentSubs = this.subs.get(dir) || [];
    this.subs.set(dir, currentSubs.concat(fn));
    const data = this.collection.get(dir);
    if (data) { fn(data); }
  }
}

export function creacteRef() {
  const dir = directive(() => (part: AttributePart) => {
    container.set(dir, part.committer.element);
  })();
  return dir;
}


export const useRef = (dir: any, fn: any) =>
  (e: any) => container.subscribe(dir, (data: any) => {
    debugger;
    fn(data, e);
  });
