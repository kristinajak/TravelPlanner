import { jsx as _jsx } from "react/jsx-runtime";
import { render, screen } from "@testing-library/react";
import Login from "./Login";
describe("Login component", function () {
    test("renders the Card component", function () {
        render(_jsx(Login, {}));
        var cardElement = screen.getByTestId("login-card");
        expect(cardElement).toBeInTheDocument();
    });
});
