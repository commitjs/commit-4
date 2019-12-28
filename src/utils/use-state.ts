import { NodePart, directive } from 'lit-html';
import { IUseState } from '../interfaces/use-state';

export const useState = <T>(value: T): IUseState<T> => {
  let node: NodePart;

  const setValue = (val: T) => {
    value = val;
    node.setValue(val);
    node.commit();
  };

  return {
    get value() {
      return value;
    },
    set value(newValue) {
      setValue(newValue);
    },
    directive: directive(() => (n: NodePart) => {
      if (node) { return; }
      node = n;
      setValue(value);
    })()
  };
}
