import { Link, Outlet } from "react-router";
import { useState, useRef, useEffect } from "react";
import { useTodo } from "../hooks/useTodo";

export const Layout = () => {
  const { todos, clearTodos, removeTodo } = useTodo();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleClearAll = () => {
    if (
      window.confirm("¿Estás seguro de que quieres eliminar todas las tareas?")
    ) {
      clearTodos();
    }
    setIsDropdownOpen(false);
  };

  const handleClearCompleted = () => {
    const completedTodos = todos.filter((todo) => todo.completed);
    if (completedTodos.length === 0) {
      alert("No hay tareas completadas para eliminar");
      setIsDropdownOpen(false);
      return;
    }

    if (
      window.confirm(
        `¿Estás seguro de que quieres eliminar ${completedTodos.length} tarea(s) completada(s)?`
      )
    ) {
      completedTodos.forEach((todo) => removeTodo(todo.id));
    }
    setIsDropdownOpen(false);
  };

  const completedCount = todos.filter((todo) => todo.completed).length;

  return (
    <div>
      <header className="bg-orange-400 text-white p-4">
        <div className="flex justify-between items-center">
          <Link to="/">
            <h1 className="text-2xl font-bold">To-Do App</h1>
          </Link>
          {todos.length > 0 && (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors duration-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                  />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m19.5 8.25-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                  <div className="py-2">
                    <button
                      onClick={handleClearCompleted}
                      disabled={completedCount === 0}
                      className={`flex items-center w-full px-4 py-2 text-sm transition-colors ${
                        completedCount === 0
                          ? "text-gray-400 cursor-not-allowed"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-4 mr-3"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                        />
                      </svg>
                      Eliminar completadas ({completedCount})
                    </button>

                    <button
                      onClick={handleClearAll}
                      className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-4 mr-3"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                        />
                      </svg>
                      Eliminar todas ({todos.length})
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </header>
      <main className="bg-slate-100 min-h-screen p-4">
        <Outlet />
      </main>
      <footer>
        <p className="text-center text-gray-600 p-4">
          © {new Date().getFullYear()} Todo App Jesus Alexander Sanchez Martinez
        </p>
      </footer>
    </div>
  );
};
