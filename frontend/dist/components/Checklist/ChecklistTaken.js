import { jsx as _jsx } from "react/jsx-runtime";
import { useState, useEffect, useContext } from "react";
import Axios from "axios";
import AuthContext from "../../store/auth-context";
import ChecklistItemTaken from "./ChecklistItemTaken";
var ChecklistTaken = function (_a) {
    var tableName = _a.tableName;
    var _b = useState([]), items = _b[0], setItems = _b[1];
    var context = useContext(AuthContext);
    useEffect(function () {
        if (context.isLoggedIn) {
            Axios.get("/checklist_checked?tableName=".concat(tableName), {
                withCredentials: true,
            })
                .then(function (response) {
                var userItemsChecked = response.data;
                console.log("userItemsChecked", userItemsChecked);
                setItems(userItemsChecked);
            })
                .catch(function (error) {
                console.error("Error fetching checklist checked data:", error);
            });
        }
    }, [context.isLoggedIn, tableName]);
    return (_jsx("div", { children: context.isLoggedIn && (_jsx("div", { children: items.length > 0 && (_jsx("div", { children: items.map(function (item) { return (_jsx(ChecklistItemTaken, { item: item }, item.id)); }) })) })) }));
};
export default ChecklistTaken;
