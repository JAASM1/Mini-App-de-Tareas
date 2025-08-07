import React, { useEffect, useState } from "react";
import { useTodo } from "../hooks/useTodo";
import type { Todo } from "../types/Todo";

interface ModalTodoProps {
  onClose: () => void;
  todoToEdit?: Todo | null;
}
const ModalTask: React.FC<ModalTodoProps> = ({ onClose, todoToEdit }) => {
  const { addTodo, updateTodo } = useTodo();
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (todoToEdit) setTitle(todoToEdit.title);
  }, [todoToEdit]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    setError("");
    
    // Validar que el título no esté vacío
    if (!title.trim()) {
      setError("Por favor ingresa un título para la tarea");
      return;
    }
    
    if (todoToEdit) {
      updateTodo(todoToEdit.id, { title: title.trim() });
    } else {
      addTodo({ id: "", title: title.trim(), completed: false });
    }
    setTitle("");
    setError("");
    onClose();
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    if (error) setError("");
  };

  return (
    <div className="fixed inset-0 bg-black/10 flex items-center justify-center">
      <div className="bg-white p-4 py-6 rounded-xl shadow-lg w-3/4 md:w-2/3 lg:w-1/3 space-y-5">
        <p className="font-semibold text-lg md:text-xl">
          {todoToEdit ? "Editar Tarea" : "Agregar una tarea"}
        </p>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="flex flex-col gap-2">
            <label htmlFor="title" className="font-semibold">
              Titulo
            </label>
            <input
              id="title"
              name="title"
              type="text"
              value={title}
              onChange={handleTitleChange}
              className={`rounded-lg border px-2 py-1 outline-orange-400 ${
                error ? 'border-red-500 focus:border-red-500' : 'border-gray-400'
              }`}
              placeholder="Escribe el título de tu tarea..."
            />
            {error && (
              <div className="flex items-center gap-2 text-red-500 text-sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
                  />
                </svg>
                <span>{error}</span>
              </div>
            )}
          </div>
          <div className="flex justify-between gap-5">
            <button
              type="submit"
              className="py-2 bg-orange-400 text-white rounded-xl hover:bg-orange-600 transition-colors w-full"
            >
              <p className="font-semibold">
                {todoToEdit ? "Actualizar" : "Agregar"}
              </p>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="py-2 bg-gray-500 text-white rounded-xl hover:bg-gray-700 transition-colors w-full"
            >
              <p className="font-semibold">Cancelar</p>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalTask;
