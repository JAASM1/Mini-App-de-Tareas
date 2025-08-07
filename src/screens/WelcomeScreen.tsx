import { useNavigate } from "react-router";

function WelcomeScreen() {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center">
        {/* Logo/Icono principal */}
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-orange-400 rounded-full shadow-lg mb-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="white"
              className="w-12 h-12"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
          </div>
        </div>

        {/* Contenido principal */}
        <section className="mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6">
            ¡Bienvenido a tu
            <span className="text-orange-500">To-Do App</span>!
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-4">
            Gestiona tus tareas y pendientes de forma sencilla
          </p>
        </section>
        {/* Botón de acción */}
        <section>
          <button
            onClick={() => navigate("/tasks")}
            className="bg-orange-500 hover:bg-orange-600 text-white text-xl font-semibold px-8 py-4 rounded-full shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center gap-3 mx-auto"
          >
            ¡Comencemos!
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
              />
            </svg>
          </button>
        </section>
      </div>
    </div>
  );
}

export default WelcomeScreen;
