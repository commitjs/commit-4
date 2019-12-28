import { NodePart } from "lit-html";

export interface IUseState<T> {
  value: T,
  directive: (n: NodePart) => void;
}
