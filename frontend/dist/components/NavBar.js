import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import classes from "./NavBar.module.css";
import AuthContext from "../store/auth-context";
function MainNavigation() {
    var context = useContext(AuthContext);
    var navigate = useNavigate();
    var logoutHandler = function () {
        context.onLogout();
        navigate("/");
    };
    return (_jsx("header", { className: classes.header, children: _jsx("nav", { children: _jsxs("ul", { className: classes.list, children: [_jsx("li", { children: _jsx(NavLink, { to: "/", className: function (_a) {
                                var isActive = _a.isActive;
                                return isActive ? classes.active : undefined;
                            }, end: true, children: "Home" }) }), !context.isLoggedIn && (_jsx("li", { children: _jsx(NavLink, { to: "/register", className: function (_a) {
                                var isActive = _a.isActive;
                                return isActive ? classes.active : undefined;
                            }, children: "Register" }) })), !context.isLoggedIn && (_jsx("li", { children: _jsx(NavLink, { to: "/login", className: function (_a) {
                                var isActive = _a.isActive;
                                return isActive ? classes.active : undefined;
                            }, children: "Log in" }) })), context.isLoggedIn && (_jsx("li", { children: _jsx(NavLink, { to: "/checklist", className: function (_a) {
                                var isActive = _a.isActive;
                                return isActive ? classes.active : undefined;
                            }, children: "Checklist" }) })), context.isLoggedIn && (_jsx("li", { children: _jsx(NavLink, { to: "/itinerary", className: function (_a) {
                                var isActive = _a.isActive;
                                return isActive ? classes.active : undefined;
                            }, children: "Itinerary" }) })), context.isLoggedIn && (_jsx("li", { children: _jsx(NavLink, { to: "/budget", className: function (_a) {
                                var isActive = _a.isActive;
                                return isActive ? classes.active : undefined;
                            }, children: "Budget" }) })), context.isLoggedIn && (_jsx("li", { className: classes.logoutButtonContainer, children: _jsx("button", { className: classes.button, onClick: logoutHandler, children: "Logout" }) }))] }) }) }));
}
export default MainNavigation;
