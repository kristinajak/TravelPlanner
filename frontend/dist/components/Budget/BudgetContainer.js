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
import Axios from "axios";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import classes from "./BudgetContainer.module.css";
var BudgetContainer = function () {
    var _a = useState(""), description = _a[0], setDescription = _a[1];
    var _b = useState(""), category = _b[0], setCategory = _b[1];
    var _c = useState(""), quantity = _c[0], setQuantity = _c[1];
    var _d = useState(""), unitCost = _d[0], setUnitCost = _d[1];
    var _e = useState(""), total = _e[0], setTotal = _e[1];
    var _f = useState([]), budgetData = _f[0], setBudgetData = _f[1];
    var _g = useState(""), errorMessage = _g[0], setErrorMessage = _g[1];
    var _h = useState(""), filteredCategory = _h[0], setFilteredCategory = _h[1];
    var _j = useState(false), showFilter = _j[0], setShowFilter = _j[1];
    var categories = [
        "Transportation",
        "Accommodation",
        "Food",
        "Entertainment",
        "Administrative",
        "Shopping",
        "Other",
    ];
    var fetchBudgetData = function () { return __awaiter(void 0, void 0, void 0, function () {
        var response, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, Axios.get("/budget", {
                            withCredentials: true,
                        })];
                case 1:
                    response = _a.sent();
                    if (response.status === 200) {
                        setBudgetData(response.data);
                    }
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    console.error("Error fetching itinerary data:", error_1);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    useEffect(function () {
        fetchBudgetData();
    }, []);
    var formatDecimal = function (value) {
        var parsedValue = parseFloat(value);
        if (!isNaN(parsedValue)) {
            return parsedValue.toFixed(2);
        }
        return "";
    };
    var calculateTotal = function () {
        var quantityValue = parseInt(quantity);
        var unitCostValue = parseFloat(unitCost);
        var calculatedTotal = quantityValue * unitCostValue;
        setTotal(calculatedTotal.toString());
    };
    var addBudgetHandler = function (event) { return __awaiter(void 0, void 0, void 0, function () {
        var formattedUnitCost, formattedTotal, response, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    event.preventDefault();
                    if (!description ||
                        !category ||
                        isNaN(Number(quantity)) ||
                        isNaN(Number(unitCost)) ||
                        Number(quantity) < 0 ||
                        Number(unitCost) < 0) {
                        setErrorMessage("Please fill in all required fields and ensure that quantity and unit cost are greater than or equal to 0.");
                        return [2 /*return*/];
                    }
                    calculateTotal();
                    formattedUnitCost = formatDecimal(unitCost);
                    formattedTotal = formatDecimal(total);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, Axios.post("/budget", {
                            description: description,
                            category: category,
                            quantity: quantity,
                            unitCost: formattedUnitCost,
                            total: formattedTotal,
                        }, {
                            withCredentials: true,
                        })];
                case 2:
                    response = _a.sent();
                    if (response.status === 200) {
                        setDescription("");
                        setCategory("");
                        setQuantity("");
                        setUnitCost("");
                        setTotal("");
                        fetchBudgetData();
                        setErrorMessage("");
                    }
                    return [3 /*break*/, 4];
                case 3:
                    error_2 = _a.sent();
                    console.error("Error adding item:", error_2);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    var removeItem = function (itemId) { return __awaiter(void 0, void 0, void 0, function () {
        var response, updatedResponse, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 5]);
                    return [4 /*yield*/, Axios.post("/budget/".concat(itemId, "/delete"), { itemId: itemId }, { withCredentials: true })];
                case 1:
                    response = _a.sent();
                    if (!(response.status === 200)) return [3 /*break*/, 3];
                    return [4 /*yield*/, Axios.get("/budget", {
                            withCredentials: true,
                        })];
                case 2:
                    updatedResponse = _a.sent();
                    setBudgetData(updatedResponse.data);
                    _a.label = 3;
                case 3: return [3 /*break*/, 5];
                case 4:
                    error_3 = _a.sent();
                    console.error("Error removing item", error_3);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    var handleFilterClick = function () {
        setShowFilter(!showFilter);
    };
    var filterBudgetData = function () {
        if (!filteredCategory) {
            return budgetData;
        }
        else {
            return budgetData.filter(function (item) { return item.category === filteredCategory; });
        }
    };
    var calculateGrandTotal = function () {
        var filteredItems = filterBudgetData();
        var total = filteredItems.reduce(function (acc, item) { return acc + parseFloat(item.total); }, 0);
        return total.toFixed(2);
    };
    return (_jsxs("div", { children: [errorMessage && _jsx("p", { className: classes.error, children: errorMessage }), _jsx("form", { onSubmit: addBudgetHandler, children: _jsxs("table", { className: classes["budget-table"], children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", { children: "Description" }), _jsxs("th", { children: ["Category", " ", _jsx(FontAwesomeIcon, { icon: faFilter, onClick: handleFilterClick, style: { cursor: "pointer" } }), showFilter && (_jsxs("select", { value: filteredCategory, onChange: function (e) { return setFilteredCategory(e.target.value); }, children: [_jsx("option", { value: "", children: "All categories" }), categories.map(function (category) { return (_jsx("option", { value: category, children: category }, category)); })] }))] }), _jsx("th", { children: "Quantity" }), _jsx("th", { children: "Unit Cost" }), _jsx("th", { children: "Total" })] }) }), _jsxs("tbody", { children: [filterBudgetData().length === 0 ? (_jsx("tr", { children: _jsx("td", { colSpan: 5, children: filteredCategory
                                            ? "No items for the selected category."
                                            : "Please add your expenses." }) })) : (filterBudgetData().map(function (item) { return (_jsxs("tr", { children: [_jsx("td", { children: item.description }), _jsx("td", { children: item.category }), _jsx("td", { children: item.quantity }), _jsx("td", { children: item.unitCost }), _jsx("td", { className: classes.total, children: item.total }), _jsx("td", { children: _jsx("button", { type: "button", onClick: function () { return removeItem(item.id); }, children: "X" }) })] }, item.id)); })), _jsxs("tr", { children: [_jsx("td", { children: _jsx("input", { type: "text", name: "description", placeholder: "Description", value: description, onChange: function (event) { return setDescription(event.target.value); } }) }), _jsx("td", { children: _jsxs("select", { name: "category", value: category, onChange: function (event) { return setCategory(event.target.value); }, children: [_jsx("option", { value: "", children: "All Categories" }), categories.map(function (category) { return (_jsx("option", { value: category, children: category }, category)); })] }) }), _jsx("td", { children: _jsx("input", { type: "number", name: "quantity", placeholder: "Quantity", value: quantity, onChange: function (event) {
                                                    setQuantity(event.target.value);
                                                } }) }), _jsx("td", { children: _jsx("input", { type: "number", name: "unitCost", placeholder: "Unit cost", value: unitCost, onChange: function (event) {
                                                    setUnitCost(event.target.value);
                                                } }) }), _jsx("td", {}), _jsx("td", { children: _jsx("button", { type: "submit", onClick: calculateTotal, children: "Add" }) })] })] }), _jsx("tfoot", { children: _jsxs("tr", { children: [_jsx("th", {}), _jsx("th", {}), _jsx("th", {}), _jsx("th", { className: classes.grandTotal, children: "Grand Total: " }), _jsx("th", { className: classes.total, children: calculateGrandTotal() })] }) })] }) })] }));
};
export default BudgetContainer;
