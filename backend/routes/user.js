const express = require("express");
const bcrypt = require("bcrypt");

const pool = require("../db");

const router = express.Router();

router.post("/register", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const passwordConfirmation = req.body.passwordConfirmation;

  const hashedPassword = bcrypt.hashSync(password, 10);
  const conn = await pool.getConnection();
  const selectQuery = `SELECT EXISTS(SELECT * FROM users WHERE email = ?)`;
  const [rows] = await conn.execute(selectQuery, [email]);
  if (email.trim() === "" || password.trim() === "") {
    conn.release();
    return res
      .status(400)
      .json({ error: "Neither email nor password can be left blank" });
  }

  if (rows[0][`EXISTS(SELECT * FROM users WHERE email = ?)`] === 1) {
    conn.release();
    return res.status(400).json({ error: "Email already exists" });
  } else if (password !== passwordConfirmation) {
    conn.release();
    return res.status(400).json({ error: "Passwords do not match" });
  } else {
    const insertQuery = "INSERT INTO users (email, password) VALUES (?, ?)";
    await conn.execute(insertQuery, [email, hashedPassword]);
    const [[newUser]] = await conn.execute(
      "SELECT id FROM users WHERE email = ?",
      [email]
    );
    req.session.userId = newUser.id;
    console.log("register session", req.session.userId);

    conn.release();
    return res.json({ message: "Registration successful", userId: newUser.id });
  }
});

router.post("/login", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const conn = await pool.getConnection();
  const selectQuery = `SELECT * FROM users WHERE email = ?`;
  const [rows, fields] = await conn.execute(selectQuery, [email]);
  if (email.trim() === "") {
    console.log("length", email.length);
    conn.release();
    return res.status(400).json({ error: "Email cannot be blank" });
  }
  if (rows.length === 0) {
    conn.release();
    return res.status(400).json({ error: "Email does not exist" });
  } else {
    const user = rows[0];
    const match = await bcrypt.compare(password, user.password);
    if (match) {
      req.session.userId = user.id;
      console.log("Login successful. User ID:", req.session.userId);
      conn.release();
      return res.json({ message: "Login successful", userId: user.id });
    } else {
      conn.release();
      return res.status(400).json({ error: "Invalid password" });
    }
  }
});

router.get("/logout", function (req, res) {
  console.log("Before destroying session");
  req.session.destroy(function (err) {
    if (err) {
      console.log("Error destroying session:", err);
    } else {
      console.log("Session destroyed successfully");
      res.clearCookie("session-cookie");
      res.json({ message: "Logged out successfully" });
    }
  });
});

module.exports = router;
