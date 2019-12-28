import { IComponent } from '../interfaces/component';

export function detectChanges(target: any, key: string, descriptor?: TypedPropertyDescriptor<any>): any {
  if (descriptor) {
    const currentMethod = descriptor.value;
    descriptor.value = function (this: IComponent, ...args: any[]) {
      currentMethod(...args);
      if (this._update) { this._update(); }
    }
    return descriptor;
  } else {
    let val: any;
    Object.defineProperty(target, key, {
      set(newValue) {
        val = newValue;
        if (this._update) { this._update(); }
      },
      get() {
        return val;
      }
    });
  }
}
