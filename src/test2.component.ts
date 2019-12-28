import { Component } from './decorators/component';
import { html } from 'lit-html';

const test2Comppnent = (context: Test2Component) => html`<div>Test 2</div>`

@Component({
  selector: 'hg-test-2',
  templateFn: test2Comppnent
})
export class Test2Component {

}