import { jsx as _jsx } from "react/jsx-runtime";
import classes from "./ChecklistItem.module.css";
var ChecklistItemReadOnly = function (_a) {
    var item = _a.item, tableName = _a.tableName;
    return (_jsx("div", { className: classes["checklist-item"], children: _jsx("span", { children: item.item }) }));
};
export default ChecklistItemReadOnly;
