var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import Axios from "axios";
import ChecklistItem from "./ChecklistItem";
import classes from "./ChecklistContainer.module.css";
var ChecklistContainer = function (_a) {
    var tableName = _a.tableName;
    var _b = useState([]), items = _b[0], setItems = _b[1];
    var _c = useState(""), newItem = _c[0], setNewItem = _c[1];
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
    var moveItemHandler = function (itemId, item) { return __awaiter(void 0, void 0, void 0, function () {
        var response, updatedResponse, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 5]);
                    return [4 /*yield*/, Axios.post("/moveItem/".concat(tableName, "/").concat(itemId), { item: item }, {
                            withCredentials: true,
                        })];
                case 1:
                    response = _a.sent();
                    if (!(response.status === 200)) return [3 /*break*/, 3];
                    return [4 /*yield*/, Axios.get("/checklist?tableName=".concat(tableName), {
                            withCredentials: true,
                        })];
                case 2:
                    updatedResponse = _a.sent();
                    setItems(updatedResponse.data);
                    setItems(function (prevItems) {
                        return prevItems.filter(function (prevItem) { return prevItem.id !== itemId; });
                    });
                    window.location.reload();
                    _a.label = 3;
                case 3: return [3 /*break*/, 5];
                case 4:
                    error_1 = _a.sent();
                    console.error("Error moving item:", error_1);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    var addItemHandler = function () { return __awaiter(void 0, void 0, void 0, function () {
        var response, updatedResponse, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 5]);
                    if (!(newItem.trim() !== "")) return [3 /*break*/, 3];
                    return [4 /*yield*/, Axios.post("/addItem", { tableName: tableName, newItem: newItem }, {
                            withCredentials: true,
                        })];
                case 1:
                    response = _a.sent();
                    if (!(response.status === 200)) return [3 /*break*/, 3];
                    setNewItem("");
                    return [4 /*yield*/, Axios.get("/checklist?tableName=".concat(tableName), {
                            withCredentials: true,
                        })];
                case 2:
                    updatedResponse = _a.sent();
                    setItems(updatedResponse.data);
                    _a.label = 3;
                case 3: return [3 /*break*/, 5];
                case 4:
                    error_2 = _a.sent();
                    console.error("Error adding item:", error_2);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    return (_jsxs("div", { children: [items.map(function (item) { return (_jsx(ChecklistItem, { item: item, tableName: tableName, onItemMove: moveItemHandler }, item.id)); }), _jsx("input", { className: classes["new-item"], value: newItem, onChange: function (event) { return setNewItem(event.target.value); }, onKeyDown: function (event) {
                    if (event.key === "Enter") {
                        addItemHandler();
                    }
                } })] }));
};
export default ChecklistContainer;
