import { jsx as _jsx } from "react/jsx-runtime";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/Home";
import Register from "./components/Register";
import RootLayout from "./pages/Root";
import Login from "./components/Login";
import Checklist from "./components/Checklist/Checklist";
import Itinerary from "./components/Itinerary/Itinerary";
import Budget from "./components/Budget/Budget";
import { AuthContextProvider } from "./store/auth-context";
var router = createBrowserRouter([
    {
        path: "/",
        element: _jsx(RootLayout, {}),
        children: [
            {
                index: true,
                element: _jsx(HomePage, {}),
            },
            {
                path: "register",
                element: _jsx(Register, {}),
            },
            {
                path: "login",
                element: _jsx(Login, {}),
            },
            {
                path: "checklist",
                element: _jsx(Checklist, {}),
            },
            {
                path: "itinerary",
                element: _jsx(Itinerary, {}),
            },
            { path: "budget", element: _jsx(Budget, {}) },
        ],
    },
]);
function App() {
    return (_jsx(AuthContextProvider, { children: _jsx(RouterProvider, { router: router }) }));
}
export default App;
