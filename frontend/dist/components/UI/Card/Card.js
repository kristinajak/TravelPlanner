import { jsx as _jsx } from "react/jsx-runtime";
import classes from "./Card.module.css";
var Card = function (props) {
    return (_jsx("div", { className: "".concat(classes.card, " ").concat(props.className), children: props.children }));
};
export default Card;
