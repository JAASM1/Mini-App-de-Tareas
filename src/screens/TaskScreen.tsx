import { useState } from "react";
import ModalTask from "../components/ModalTask";
import TaskList from "../components/TaskList";
import type { Todo } from "../types/Todo";

function TaskScreen() {
  const [openModal, setOpenModal] = useState(false);
  const [todoToEdit, setTodoToEdit] = useState<Todo | null>(null);

  const handleCloseModal = () => {
    setOpenModal(false);
    setTodoToEdit(null);
  };

  const handleEditTodo = (todo: Todo) => {
    setTodoToEdit(todo);
    setOpenModal(true);
  };

  return (
    <>
      <div>
        {/* Componente de renderizado de los todos */}
        <TaskList onEditTodo={handleEditTodo} />

        {/* Boton flotante para agregar una todo */}
        <button
          onClick={() => setOpenModal(true)}
          className="fixed bottom-5 right-5 bg-orange-500 text-white p-3 rounded-full shadow-lg hover:bg-orange-600 transform hover:scale-105 transition-all duration-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
        </button>
      </div>

      {/* Modal para agregar/editar una todo */}
      {openModal && <ModalTask onClose={handleCloseModal} todoToEdit={todoToEdit} />}
    </>
  );
}

export default TaskScreen;
