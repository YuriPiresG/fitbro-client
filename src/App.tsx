import { MantineProvider } from "@mantine/core";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import LoginScreen from "./components/LoginScreen";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Layout } from "./components/Layout";
import HomeScreen from "./components/HomeScreen";

const queryClient = new QueryClient();
const router = createBrowserRouter([
  { path: "/", element: <LoginScreen /> },
  {
    path: "/",
    element: <Layout />,
    children: [{ path: "home", element: <HomeScreen /> }],
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
