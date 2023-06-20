import { MantineProvider } from "@mantine/core";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import LoginScreen from "./components/LoginScreen";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Layout } from "./components/Layout";
import HomeScreen from "./components/HomeScreen";
import Workouts from "./components/Workouts";
import Diets from "./components/Diets";
import Body from "./components/Body";
import Measurements from "./components/Measurements";

const queryClient = new QueryClient();
const router = createBrowserRouter([
  { path: "/", element: <LoginScreen /> },
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "home", element: <HomeScreen /> },
      { path: "workout", element: <Workouts /> },
      { path: "diet", element: <Diets /> },
      { path: "measurements", element: <Measurements /> },
      { path: "body", element: <Body /> },
    ],
  },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider withGlobalStyles withNormalizeCSS>
        <RouterProvider router={router} />
        <ToastContainer />
      </MantineProvider>
    </QueryClientProvider>
  );
}

export default App;
