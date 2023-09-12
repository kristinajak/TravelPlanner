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
import classes from "./ItineraryContainer.module.css";
var ItineraryContainer = function () {
    var _a = useState(""), date = _a[0], setDate = _a[1];
    var _b = useState(""), city = _b[0], setCity = _b[1];
    var _c = useState(""), comments = _c[0], setComments = _c[1];
    var _d = useState([]), itineraryData = _d[0], setItineraryData = _d[1];
    var _e = useState(""), errorMessage = _e[0], setErrorMessage = _e[1];
    var fetchItineraryData = function () { return __awaiter(void 0, void 0, void 0, function () {
        var response, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, Axios.get("/itinerary", {
                            withCredentials: true,
                        })];
                case 1:
                    response = _a.sent();
                    if (response.status === 200) {
                        setItineraryData(response.data);
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
        fetchItineraryData();
    }, []);
    var addItineraryHandler = function (event) { return __awaiter(void 0, void 0, void 0, function () {
        var response, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    event.preventDefault();
                    if (!date || !city || !comments) {
                        setErrorMessage("Please fill in all fields.");
                        return [2 /*return*/];
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, Axios.post("/itinerary", { date: date, city: city, comments: comments }, {
                            withCredentials: true,
                        })];
                case 2:
                    response = _a.sent();
                    if (response.status === 200) {
                        setDate("");
                        setCity("");
                        setComments("");
                        fetchItineraryData();
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
                    return [4 /*yield*/, Axios.post("/itinerary/".concat(itemId, "/delete"), { itemId: itemId }, { withCredentials: true })];
                case 1:
                    response = _a.sent();
                    if (!(response.status === 200)) return [3 /*break*/, 3];
                    return [4 /*yield*/, Axios.get("/itinerary", {
                            withCredentials: true,
                        })];
                case 2:
                    updatedResponse = _a.sent();
                    setItineraryData(updatedResponse.data);
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
    return (_jsxs("div", { children: [_jsx("form", { onSubmit: addItineraryHandler, children: _jsxs("table", { className: classes["itinerary-table"], children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", { children: "Date" }), _jsx("th", { children: "City" }), _jsx("th", { children: "Comments" })] }) }), _jsxs("tbody", { children: [itineraryData.map(function (item) { return (_jsxs("tr", { children: [_jsx("td", { children: item.date }), _jsx("td", { children: item.city }), _jsx("td", { children: item.comments }), _jsx("td", { children: _jsx("button", { type: "button", onClick: function () { return removeItem(item.id); }, children: "X" }) })] }, item.id)); }), _jsxs("tr", { children: [_jsx("td", { children: _jsx("div", { className: classes.date, children: _jsx("input", { type: "date", name: "newDate", value: date, onChange: function (event) { return setDate(event.target.value); } }) }) }), _jsx("td", { children: _jsx("input", { type: "text", name: "newCity", placeholder: "Add City", value: city, onChange: function (event) { return setCity(event.target.value); } }) }), _jsx("td", { children: _jsx("input", { type: "text", name: "newComments", placeholder: "Add comment", value: comments, onChange: function (event) { return setComments(event.target.value); } }) }), _jsx("td", { children: _jsx("button", { type: "submit", children: "Add" }) })] })] })] }) }), errorMessage && _jsx("p", { className: classes.error, children: errorMessage })] }));
};
export default ItineraryContainer;
