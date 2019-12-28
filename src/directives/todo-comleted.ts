import { directive, NodePart } from "lit-html";

export const todoCompletedDirective = directive((todo) => (part: NodePart) => {
  if (todo.completed) {
    part.setValue('completed');
    part.commit();
    return;
  }
  part.setValue('');
});
