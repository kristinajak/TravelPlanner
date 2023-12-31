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
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import Card from "./UI/Card/Card";
import classes from "./Register.module.css";
import AuthContext from "../store/auth-context";
function Register() {
    var _this = this;
    var _a = useState(""), email = _a[0], setEmail = _a[1];
    var _b = useState(""), password = _b[0], setPassword = _b[1];
    var _c = useState(""), passwordConfirmation = _c[0], setPasswordConfirmation = _c[1];
    var _d = useState(), errorMessage = _d[0], setErrorMessage = _d[1];
    var _e = useState(false), successfulRegistration = _e[0], setSuccessRegistration = _e[1];
    var navigate = useNavigate();
    var context = useContext(AuthContext);
    var submissionHandler = function (event) { return __awaiter(_this, void 0, void 0, function () {
        var response, data, error_1;
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    event.preventDefault();
                    if (password !== passwordConfirmation) {
                        setErrorMessage("Passwords do not match");
                        setPassword("");
                        setPasswordConfirmation("");
                        return [2 /*return*/];
                    }
                    _c.label = 1;
                case 1:
                    _c.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, Axios.post("http://localhost:8080/register", {
                            email: email,
                            password: password,
                            passwordConfirmation: passwordConfirmation,
                        }, {
                            headers: {
                                "Content-Type": "application/json",
                            },
                            withCredentials: true,
                        })];
                case 2:
                    response = _c.sent();
                    data = response.data;
                    if (response.status === 200) {
                        context.onLogin(email, password);
                        setSuccessRegistration(true);
                        setEmail("");
                        setPassword("");
                        setPasswordConfirmation("");
                        navigate("/");
                    }
                    else {
                        console.log("Error data:", data);
                        throw new Error(data.error);
                    }
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _c.sent();
                    if ((_b = (_a = error_1.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.error) {
                        setErrorMessage(error_1.response.data.error);
                    }
                    else {
                        setErrorMessage("An error occurred during login.");
                    }
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    return (_jsxs("div", { children: [successfulRegistration && _jsx("p", { children: "Registration was successful!" }), _jsxs(Card, { className: classes.register, children: [errorMessage && _jsx("p", { className: classes.error, children: errorMessage }), _jsxs("form", { className: classes.form, onSubmit: submissionHandler, children: [_jsx("label", { children: "Email address" }), _jsx("input", { type: "email", name: "email", value: email, onChange: function (event) { return setEmail(event.target.value); }, placeholder: "name@example.com" }), _jsx("label", { children: "Password" }), _jsx("input", { type: "password", name: "password", value: password, onChange: function (event) { return setPassword(event.target.value); } }), _jsx("label", { children: "Password Confirmation" }), _jsx("input", { type: "password", name: "passwordConfirmation", value: passwordConfirmation, onChange: function (event) { return setPasswordConfirmation(event.target.value); } }), _jsx("div", { className: classes.actions, children: _jsx("button", { type: "submit", children: "Submit" }) })] })] })] }));
}
export default Register;
