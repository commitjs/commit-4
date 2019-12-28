import { Component } from '../decorators/component';
import { html, directive, NodePart } from 'lit-html';
import { IRoute } from '../interfaces/route';
import { pathToRegexp } from 'path-to-regexp';
import { detectChanges } from '../decorators/detect-changes';

const outlet = directive((Component) => (part: NodePart) => {
  if (!Component) { return; }
  const instance = new Component();
  part.setValue(instance);
  part.commit();
});

const routerTemplate = (context: RouterComponent) =>
  html`<div>${outlet(context.activeComponent)}</div>`

@Component({
  selector: 'hg-router',
  templateFn: routerTemplate
})
export class RouterComponent {
  routes: IRoute[] = [];
  @detectChanges activeComponent: any = null;
  _routes!: { component: any, re: RegExp }[]

  connectedCallback() {
    window.addEventListener('popstate', this.stateChangeHandler);
    window.addEventListener('hashchange', this.stateChangeHandler);

    // Another way to do it...
    // const _pushState = window.history.pushState;
    // window.history.pushState = function() {
    //   window.dispatchEvent(new )
    // }

    if (this.routes.length === 0) { return; }
    this._routes = this.routes.map(r => ({ component: r.component, re: pathToRegexp(r.path) }));
    this.render();
  }

  stateChangeHandler = (event: any) => {
    event.preventDefault();
    this.render();
  }

  navigate(path: string) {
    window.history.pushState(null, '', path);
    this.render();
  }

  render() {
    const path = window.location.pathname;
    const currentRoute = this._routes.find(i => i.re.test(path));
    this.activeComponent = currentRoute?.component;
    console.log(this.activeComponent);
  }

  disconnectedCallback() {
    window.removeEventListener('popstate', this.stateChangeHandler);
    window.removeEventListener('hashchange', this.stateChangeHandler);
  }
}