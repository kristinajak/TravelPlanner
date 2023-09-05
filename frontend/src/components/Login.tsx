import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";

import Card from "./UI/Card/Card";
import classes from "./Login.module.css";
import AuthContext from "../store/auth-context";

interface LoginResponse {
  message: string;
  error?: string;
}

function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [errorMessage, setErrorMessage] = useState<string | undefined>();

  const navigate = useNavigate();
  const context = useContext(AuthContext);

  const submissionHandler = async (event: React.FormEvent): Promise<void> => {
    event.preventDefault();

    try {
      const response = await Axios.post(
        "http://localhost:3000/login",
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      const data: LoginResponse = response.data;
      console.log("login data: ", data);

      if (response.status === 200) {
        context.onLogin(email, password);
        setEmail("");
        setPassword("");
        navigate("/");
      } else {
        console.log("Login failed", data);
        setErrorMessage(data.error as string);
      }
    } catch (error: any) {
      if (error.response?.data?.error) {
        setErrorMessage(error.response.data.error as string);
      } else {
        setErrorMessage("An error occurred during login.");
      }
    }
  };

  return (
    <div>
      <Card className={classes.login}>
        {errorMessage && <p>{errorMessage}</p>}
        <form className={classes.form} onSubmit={submissionHandler}>
          <label>Email address</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="name@example.com"
          />
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <div className={classes.actions}>
            <button type="submit">Submit</button>
          </div>
        </form>
      </Card>
    </div>
  );
}

export default Login;
