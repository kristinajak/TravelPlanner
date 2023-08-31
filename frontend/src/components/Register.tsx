import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";

import Card from "./UI/Card/Card";
import classes from "./Register.module.css";
import AuthContext from "../store/auth-context";

interface RegistrationResponse {
  message: string;
  error?: string;
}

function Register() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | undefined>();
  const [successfulRegistration, setSuccessRegistration] = useState(false);

  const navigate = useNavigate();
  const context = useContext(AuthContext);

  const submissionHandler = async (event: React.FormEvent): Promise<void> => {
    event.preventDefault();

    if (password !== passwordConfirmation) {
      setErrorMessage("Passwords do not match");
      setPassword("");
      setPasswordConfirmation("");
      return;
    }

    try {
      const response = await Axios.post(
        "http://localhost:8080/register",
        {
          email,
          password,
          passwordConfirmation,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      const data: RegistrationResponse = response.data;

      if (response.status === 200) {
        console.log(data.message);
        context.onLogin(email, password);
        setSuccessRegistration(true);
        setEmail("");
        setPassword("");
        setPasswordConfirmation("");
        navigate("/");
      } else {
        console.log("Error data:", data);
        throw new Error(data.error as string);
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
      {successfulRegistration && <p>Registration was successful!</p>}
      <Card className={classes.register}>
        {errorMessage && <p className={classes.error}>{errorMessage}</p>}
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
          <label>Password Confirmation</label>
          <input
            type="password"
            name="passwordConfirmation"
            value={passwordConfirmation}
            onChange={(event) => setPasswordConfirmation(event.target.value)}
          />
          <div className={classes.actions}>
            <button type="submit">Submit</button>
          </div>
        </form>
      </Card>
    </div>
  );
}

export default Register;
