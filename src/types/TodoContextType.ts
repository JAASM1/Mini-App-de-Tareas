import type { Todo } from "./Todo";

export interface TodoContextType {
  todos: Todo[];
  addTodo: (todo: Todo) => void;
  updateTodo: (id: string, updateTodo: Partial<Todo>) => void;
  toggleTodo: (index: string) => void;
  removeTodo: (index: string) => void;
  clearTodos: () => void;
}
