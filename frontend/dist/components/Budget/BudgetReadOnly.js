import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from "react-router-dom";
import classes from "./BudgetReadOnly.module.css";
var BudgetReadOnly = function () {
    return (_jsxs("div", { children: [_jsxs("table", { className: classes["budget-table"], children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", { children: "Description" }), _jsx("th", { children: "Category" }), _jsx("th", { children: "Quantity" }), _jsx("th", { children: "Unit Cost" }), _jsx("th", { children: "Total" })] }) }), _jsx("tbody", { children: _jsxs("tr", { children: [_jsx("td", { children: _jsx("i", { children: "e.g. Lunch" }) }), _jsx("td", { children: _jsx("i", { children: "e.g. Food" }) }), _jsx("td", { children: _jsx("i", { children: "e.g. 2 " }) }), _jsx("td", { children: _jsx("i", { children: "e.g. \u20AC20 " }) }), _jsx("td", { children: _jsx("i", { children: "e.g. \u20AC40 " }) })] }) })] }), _jsx("p", { children: _jsxs("i", { className: classes.link, children: ["Ready to update the checklist? ", _jsx(Link, { to: "/login", children: "Log in" }), " or", " ", _jsx(Link, { to: "/register", children: "register" }), " to get started."] }) })] }));
};
export default BudgetReadOnly;
