import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/Home";
import Register from "./components/Register";
import RootLayout from "./pages/Root";
import Login from "./components/Login";
import Checklist from "./components/Checklist/Checklist";
import Itinerary from "./components/Itinerary/Itinerary";
import Budget from "./components/Budget/Budget";

import { AuthContextProvider } from "./store/auth-context";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "checklist",
        element: <Checklist />,
      },
      {
        path: "itinerary",
        element: <Itinerary />,
      },
      { path: "budget", element: <Budget /> },
    ],
  },
]);

function App() {
  return (
    <AuthContextProvider>
      <RouterProvider router={router} />
    </AuthContextProvider>
  );
}

export default App;
