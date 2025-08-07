import { createBrowserRouter } from "react-router";
import { Layout } from "../components/Layout.tsx";
import WelcomeScreen from "../screens/WelcomeScreen.tsx";
import TaskScreen from "../screens/TaskScreen.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <WelcomeScreen />,
  },
  {
    path: "/tasks",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <TaskScreen />,
      },
    ],
  },
]);

export default router;
