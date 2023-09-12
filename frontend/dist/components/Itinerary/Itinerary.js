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
import { useState, useContext, useEffect, useRef } from "react";
import Axios from "axios";
import classes from "./Itinerary.module.css";
import AuthContext from "../../store/auth-context";
import ItineraryReadOnly from "./ItineraryReadOnly";
import ItineraryContainer from "./ItineraryContainer";
var apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
var DEFAULT_MAP_CENTER = { lat: 54.8985207, lng: 23.9035965 };
var Itinerary = function () {
    var _a = useState(""), inputValue = _a[0], setInputValue = _a[1];
    var _b = useState(null), map = _b[0], setMap = _b[1];
    var context = useContext(AuthContext);
    var mapContainerRef = useRef(null);
    var addressInputHandler = function (event) {
        if (event.target instanceof HTMLInputElement) {
            setInputValue(event.target.value);
        }
    };
    var initializeMap = function (center) {
        var newMap = new google.maps.Map(mapContainerRef.current, {
            center: center,
            zoom: 14,
        });
        setMap(newMap);
        new google.maps.Marker({ position: center, map: newMap });
    };
    useEffect(function () {
        initializeMap(DEFAULT_MAP_CENTER);
    }, []);
    var searchAddressHandler = function (event) { return __awaiter(void 0, void 0, void 0, function () {
        var response, coordinates, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    event.preventDefault();
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, Axios.get("https://maps.googleapis.com/maps/api/geocode/json?address=".concat(encodeURI(inputValue), "&key=").concat(apiKey))];
                case 2:
                    response = _a.sent();
                    if (response.data.status !== "OK") {
                        throw new Error("Could not fetch location!");
                    }
                    coordinates = response.data.results[0].geometry.location;
                    console.log(coordinates);
                    map.setCenter(coordinates);
                    map.setZoom(14);
                    new google.maps.Marker({ position: coordinates, map: map });
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    console.error("Error loading a map", error_1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    return (_jsxs("div", { className: classes.itinerary, children: [_jsx("h1", { children: "Itinerary" }), _jsx("p", { children: "Create a detailed itinerary with dates and cities, including important information about local customs, popular attractions, and local cuisine to make the most of your trip." }), !context.isLoggedIn && _jsx(ItineraryReadOnly, {}), context.isLoggedIn && _jsx(ItineraryContainer, {}), _jsx("div", { id: "map", className: classes.map, ref: mapContainerRef }), _jsxs("form", { className: classes.form, onSubmit: searchAddressHandler, children: [_jsx("input", { type: "text", id: "address", className: classes.input, placeholder: "Enter an address", value: inputValue, onChange: addressInputHandler }), _jsx("button", { type: "submit", className: classes.button, children: "Search address" })] })] }));
};
export default Itinerary;
