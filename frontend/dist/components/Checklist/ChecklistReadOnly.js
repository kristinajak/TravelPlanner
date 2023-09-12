import { jsx as _jsx } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import Axios from "axios";
import ChecklistItemReadOnly from "./ChecklistItemReadOnly";
var ChecklistReadOnly = function (_a) {
    var tableName = _a.tableName;
    var _b = useState([]), items = _b[0], setItems = _b[1];
    useEffect(function () {
        Axios.get("/checklist?tableName=".concat(tableName), {
            withCredentials: true,
        })
            .then(function (response) {
            var userItems = response.data;
            setItems(userItems);
        })
            .catch(function (error) {
            console.error("Error fetching checklist data:", error);
        });
    }, [tableName]);
    return (_jsx("div", { children: items.map(function (item) { return (_jsx(ChecklistItemReadOnly, { item: item, tableName: tableName }, item.id)); }) }));
};
export default ChecklistReadOnly;
