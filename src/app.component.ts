import { html } from 'lit-html';
import { todoCompletedDirective } from './directives/todo-comleted';
import { Component } from './decorators/component';
import { detectChanges } from './decorators/detect-changes';
import { ITodo } from './interfaces/todo';
import { useState } from './utils/use-state';
import { appRoutes } from './app-routes';
import { creacteRef, useRef } from './directives/ref';


const rootTemplate = (context: AppRoot) => html`
<nav>
  <a @click=${useRef(context.router, (ref: any) => { ref.navigate('/'); })}>Test 1</a>
  <a @click=${useRef(context.router, (ref: any) => { ref.navigate('/test-2'); })}>Test 2</a>
</nav>
<hg-router data-ref=${context.router} .routes=${appRoutes}></hg-router>
<input type="text" @keyup=${context.inputKeyupHandler} .value=${context.titleInputValue}>
<button ?disabled=${!context.titleInputValue} @click=${context.addTodoHandler}>Add Todo</button>
<div>${context.number.directive}</div>
<button @click=${() => { context.number.value = context.number.value + 1 }}>CHANGE!</button>
<ul>
  ${context.todos.map(
  todo =>
    html`<li class=${todoCompletedDirective(todo)} @click=${() => context.todoToggleHandler(todo)}> ${todo.title} ${todo.completed}</li>`)
  }
</ul>
`;

@Component({ selector: 'hg-root', templateFn: rootTemplate })
class AppRoot {

  @detectChanges titleInputValue = '';

  router = creacteRef();

  todos: ITodo[] = [];
  number = useState(1000);

  @detectChanges todoToggleHandler(todo: ITodo) {
    todo.completed = !todo.completed;
  }

  inputKeyupHandler(event: KeyboardEvent) {
    const target = event.target as HTMLInputElement;
    this.titleInputValue = target.value;
  }

  addTodoHandler() {
    this.todos = this.todos.concat({ title: this.titleInputValue, completed: false });
    this.titleInputValue = '';
  }

  constructor(private test?: number) {
    this.titleInputValue = '';
  }

  connectedCallback() {
    console.log('Connected!');
  }
}
