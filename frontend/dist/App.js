import { jsx as _jsx } from "react/jsx-runtime";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
// import MainNavigation from "./components/NavBar";
import HomePage from "./pages/Home";
import Register from "./components/Register";
import RootLayout from "./pages/Root";
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
        ],
    },
]);
function App() {
    return _jsx(RouterProvider, { router: router });
}
export default App;
