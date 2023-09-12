import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../store/auth-context";
import classes from "./Checklist.module.css";
import ChecklistContainer from "./ChecklistContainer";
import ChecklistTaken from "./ChecklistTaken";
import ChecklistReadOnly from "./ChecklistReadOnly";
import UpdateChecklist from "./UpdateChecklist";
function ChecklistTables() {
    var context = useContext(AuthContext);
    var checklistTables = [
        { tableName: "documents", title: "Documents" },
        { tableName: "general", title: "General" },
        { tableName: "toiletries", title: "Toiletries" },
        { tableName: "clothes", title: "Clothes" },
        { tableName: "medicine", title: "Medicine" },
        { tableName: "ToDo", title: "ToDo" },
    ];
    return (_jsxs("div", { className: classes.checklist, children: [_jsx("h1", { children: "Checklist" }), _jsx("p", { children: "Remember to bring not only the essential items that are important for everyone, but also your personal must-haves that can make your trip complete." }), _jsx("p", { children: !context.isLoggedIn && (_jsxs("i", { children: ["Ready to update the checklist? ", _jsx(Link, { to: "/login", children: "Log in" }), " or", " ", _jsx(Link, { to: "/register", children: "register" }), " to get started."] })) }), _jsx("h2", { children: "What do I have on my list?" }), _jsx("div", { className: classes["checklist-tables"], children: checklistTables.map(function (table) { return (_jsxs("div", { className: classes["checklist-table"], children: [_jsx("h3", { children: table.title }), context.isLoggedIn && (_jsx(ChecklistContainer, { tableName: table.tableName })), !context.isLoggedIn && (_jsx(ChecklistReadOnly, { tableName: table.tableName }))] }, table.tableName)); }) }), _jsx("h2", { className: classes.text, children: "I already have in my bags..." }), _jsx("div", { className: classes["checklist-tables"], children: checklistTables.map(function (table) { return (_jsxs("div", { className: classes["checklist-table-checked"], children: [_jsx("h3", { children: table.title }), context.isLoggedIn && (_jsx(ChecklistTaken, { tableName: table.tableName }))] }, "".concat(table.tableName))); }) }), context.isLoggedIn && (_jsxs("div", { children: [_jsx("h2", { className: classes.text, children: "Ready for a new trip?" }), _jsxs("p", { children: ["Press the button to update your checklist once again.", " ", _jsx("i", { children: "Please note: all your checked items will be moved to unchecked." })] }), _jsx(UpdateChecklist, {})] }))] }));
}
export default ChecklistTables;
