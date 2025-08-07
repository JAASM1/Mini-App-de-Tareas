import { useTodo } from "../hooks/useTodo";
import Task from "./Task";
import type { Todo } from "../types/Todo";

interface TaskListProps {
  onEditTodo: (todo: Todo) => void;
}

const TaskList = ({ onEditTodo }: TaskListProps) => {
  const { todos } = useTodo();
  
  // Mensaje cuando no hay tareas
  if (todos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] p-8">
        <div className="text-center">
          {/* Icono */}
          <div className="w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-12 h-12 text-orange-400"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12h3.75M9 15h3.75M9 18h3.75m3-9h3.75m-3.75 4.5h3.75m-3.75 4.5h3.75M5.625 3h12.75c.621 0 1.125.504 1.125 1.125v16.5c0 .621-.504 1.125-1.125 1.125H5.625c-.621 0-1.125-.504-1.125-1.125V4.125c0-.621.504-1.125 1.125-1.125Z"
              />
            </svg>
          </div>
          
          {/* Mensaje principal */}
          <h2 className="text-2xl md:text-3xl font-bold text-gray-700 mb-4">
            ¡No tienes tareas pendientes!
          </h2>
          
          {/* Mensaje secundario */}
          <p className="text-lg text-gray-500 mb-6 max-w-md mx-auto">
            Tu lista está vacía. ¿Qué tal si agregas tu primera tarea usando el botón naranja?
          </p>
          
          {/* Indicador visual */}
          <div className="flex items-center justify-center gap-2 text-orange-500">
            <span className="text-sm font-medium">Haz clic en el botón</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
            <span className="text-sm font-medium">para comenzar</span>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {todos.map((todo) => (
        <Task 
          key={todo.id}
          id={todo.id} 
          title={todo.title} 
          completed={todo.completed}
          onEdit={onEditTodo}
        />
      ))}
    </div>
  );
};

export default TaskList;
