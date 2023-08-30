import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { Outlet } from "react-router";
import MainNavigation from "../components/NavBar";
function RootLayout() {
    return (_jsxs(_Fragment, { children: [_jsx(MainNavigation, {}), _jsx("main", { children: _jsx(Outlet, {}) })] }));
}
export default RootLayout;
