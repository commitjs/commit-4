import { IComponent } from "../interfaces/component";
import { TemplateResult, render } from "lit-html";

export function Component<T>({ selector, templateFn }: { selector: string, templateFn: (context: T) => TemplateResult }): any {
  return function componentDecorator(target: any) {

    console.log(Reflect.getMetadata('design:paramtypes', target));

    class Cmp extends HTMLElement implements IComponent {
      _update: () => void;

      constructor() {
        super();

        target.call(this);

        const root = this.attachShadow({ mode: 'open' });
        let updateScheduled = false;
        this._update = () => {
          if (updateScheduled) { return; }
          updateScheduled = true;

          Promise.resolve().then(() => {
            updateScheduled = false;
            render(templateFn(this as any), root, { eventContext: this });
          })
        };
        this._update();
      }
    }

    const { constructor, ...others } = Object.getOwnPropertyDescriptors(target.prototype);
    Object.defineProperties(Cmp.prototype, others);

    customElements.define(selector, Cmp);
    return Cmp;
  }
}
