import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { NavLink } from "react-router-dom";
import classes from "./NavBar.module.css";
function MainNavigation() {
    return (_jsx("header", { className: classes.header, children: _jsx("nav", { children: _jsxs("ul", { className: classes.list, children: [_jsx("li", { children: _jsx(NavLink, { to: "/", className: function (_a) {
                                var isActive = _a.isActive;
                                return isActive ? classes.active : undefined;
                            }, end: true, children: "Home" }) }), _jsx("li", { children: _jsx(NavLink, { to: "/register", className: function (_a) {
                                var isActive = _a.isActive;
                                return isActive ? classes.active : undefined;
                            }, children: "Register" }) }), _jsx("li", { children: _jsx(NavLink, { to: "/signin", className: function (_a) {
                                var isActive = _a.isActive;
                                return isActive ? classes.active : undefined;
                            }, children: "Sign in" }) }), _jsx("li", { children: _jsx(NavLink, { to: "/logout", className: function (_a) {
                                var isActive = _a.isActive;
                                return isActive ? classes.active : undefined;
                            }, children: "Logout" }) })] }) }) }));
}
export default MainNavigation;
