import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from "react-router-dom";
import classes from "./ItineraryReadOnly.module.css";
var ItineraryReadOnly = function () {
    return (_jsxs("div", { children: [_jsxs("table", { className: classes["itinerary-table"], children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", { children: "Date" }), _jsx("th", { children: "City" }), _jsx("th", { children: "Comments" })] }) }), _jsx("tbody", { children: _jsxs("tr", { children: [_jsx("td", { children: _jsx("i", { children: "e.g. March 30 - April 3" }) }), _jsx("td", { children: _jsx("i", { children: "e.g. Kaunas" }) }), _jsx("td", { children: _jsx("i", { children: "e.g. Places to visit: Pazaislis Monastery, Kaunas Castle, Oldtown" }) })] }) })] }), _jsx("p", { children: _jsxs("i", { className: classes.link, children: ["Ready to update the checklist? ", _jsx(Link, { to: "/login", children: "Log in" }), " or", " ", _jsx(Link, { to: "/register", children: "register" }), " to get started."] }) })] }));
};
export default ItineraryReadOnly;
