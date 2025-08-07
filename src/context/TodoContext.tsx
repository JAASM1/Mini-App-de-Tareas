import { createContext, useState, useEffect } from "react";
import type { TodoContextType } from "../types/TodoContextType";
import type { Todo } from "../types/Todo";

export const TodoContext = createContext<TodoContextType | undefined>(
  undefined
);

const LOCAL_STORAGE_KEY = "todos";

export const TodoProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  //    Traer las notas al iniciar la apliacion
  useEffect(() => {
    const storedTodos = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedTodos) setTodos(JSON.parse(storedTodos));
    setIsLoaded(true);
  }, []);
  //   Guardar cuando haya un cambio
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
    }
  }, [todos, isLoaded]);

  //   Añadir una nueva nota
  const addTodo = (todo: Todo) => {
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      title: todo.title,
      completed: todo.completed,
    };
    setTodos((prevTodos) => [...prevTodos, newTodo]);
  };
  // Editar una nota
  const updateTodo = (id: string, updateTodo: Partial<Todo>) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, ...updateTodo } : todo
      )
    );
  };
  //   Cambiar el estado de una nota
  const toggleTodo = (id: string) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };
  //   Eliminar una nota
  const removeTodo = (id: string) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };
  //   Eliminat todas las notas
  const clearTodos = () => {
    setTodos([]);
  };

  return (
    <TodoContext.Provider
      value={{ todos, addTodo, updateTodo, toggleTodo, removeTodo, clearTodos }}
    >
      {children}
    </TodoContext.Provider>
  );
};
