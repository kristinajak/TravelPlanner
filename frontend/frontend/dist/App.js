import { jsx as _jsx } from "react/jsx-runtime";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
// import MainNavigation from "./components/NavBar";
import HomePage from "./pages/Home";
import Register from "./pages/Register";
import RootLayout from "./pages/Root";
import Signin from "./pages/Signin";
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
                path: "signin",
                element: _jsx(Signin, {}),
            },
        ],
    },
]);
function App() {
    return _jsx(RouterProvider, { router: router });
}
export default App;
