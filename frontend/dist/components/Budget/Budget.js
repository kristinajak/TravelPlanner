import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useContext } from "react";
import classes from "./Budget.module.css";
import BudgetReadOnly from "./BudgetReadOnly";
import AuthContext from "../../store/auth-context";
import BudgetContainer from "./BudgetContainer";
var Budget = function () {
    var context = useContext(AuthContext);
    return (_jsxs("div", { className: classes.budget, children: [_jsx("h1", { children: "Budget" }), _jsx("p", { children: "Traveling is always an option if you know how much you can afford to spend." }), !context.isLoggedIn && _jsx(BudgetReadOnly, {}), context.isLoggedIn && _jsx(BudgetContainer, {})] }));
};
export default Budget;
