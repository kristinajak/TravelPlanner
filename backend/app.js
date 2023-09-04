const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const bcrypt = require("bcrypt");
const mysql = require("mysql2");
const session = require("express-session");
const cookieParser = require("cookie-parser");

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(bodyParser.json());

app.use(cookieParser());
app.use(
  session({
    name: "session-cookie",
    secret: "sthrth565h6s2hrt6",
    resave: false,
    saveUninitialized: false,
  })
);

const pool = require("./db");

app.post("/register", async (req, res) => {
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

app.post("/login", async (req, res) => {
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

async function userChecklistItems(tableName, userId) {
  const conn = await pool.getConnection();
  const query = `SELECT ${tableName}.id, ${tableName}.item 
  FROM ${tableName} 
  WHERE (${tableName}.user_id = ? OR ${tableName}.user_id = 'default') AND ${tableName}.id NOT IN (
    SELECT ${tableName}_checked.id 
    FROM ${tableName}_checked 
    WHERE ${tableName}_checked.user_id = ?)`;
  const [rows, fields] = await conn.query(query, [userId, userId]);
  console.log("userChecklistItems", rows);
  const checklistItems = rows.map((row) => {
    return { id: row.id, item: row.item };
  });
  conn.release();
  return checklistItems;
}

async function userChecklistItemsChecked(tableName, userId) {
  const conn = await pool.getConnection();
  const query = `SELECT ${tableName}.id, ${tableName}.item 
  FROM ${tableName} 
  WHERE (${tableName}.user_id = ? OR ${tableName}.user_id = 'default')
    `;
  const [rows, fields] = await conn.query(query, [userId]);
  console.log("userChecklistItemsChecked", rows);
  const checklistItemsChecked = rows.map((row) => {
    return { id: row.id, item: row.item };
  });
  conn.release();
  return checklistItemsChecked;
}

app.get("/checklist", async (req, res) => {
  try {
    const { tableName } = req.query;
    console.log("checklist tablename", tableName);
    const userId = req.session.userId;
    console.log("checklist userId", userId);

    if (userId) {
      const userItems = await userChecklistItems(tableName, userId);
      res.json(userItems);
    } else {
      const conn = await pool.getConnection();
      const [rows, fields] = await conn.query(
        `SELECT id, item FROM ?? WHERE user_id = 'default'`,
        [tableName]
      );
      console.log("checklist", rows);
      const checklistItems = rows.map((row) => {
        return { id: row.id, item: row.item };
      });
      conn.release();

      res.json(checklistItems);
    }
  } catch (error) {
    console.error("Error fetching checklist data:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching checklist data" });
  }
});

app.get("/checklist_checked", async (req, res) => {
  try {
    const userId = req.session.userId;
    console.log("checklist_checked userId: ", userId);
    const { tableName } = req.query;
    console.log("checklist_checked tableName: ", tableName);

    if (userId) {
      const userItemsChecked = await userChecklistItemsChecked(
        `${tableName}_checked`,
        userId
      );
      console.log("checklist_checked", userItemsChecked);
      res.json(userItemsChecked);
    } else {
      console.log("No userId");
      res.status(500);
    }
  } catch (error) {
    console.error("Error fetching checklist checked data:", error);
    res.status(500).json({
      error: "An error occurred while fetching checklist checked data",
    });
  }
});

app.post("/moveItem/:tableName/:itemId", async (req, res) => {
  try {
    const { tableName, itemId } = req.params;
    const userId = req.session.userId;

    const getItemQuery = `SELECT * FROM ${tableName} WHERE id = ?`;
    const insertQuery = `INSERT INTO ${tableName}_checked (id, user_id, item) VALUES (?, ?, ?)`;

    const conn = await pool.getConnection();

    try {
      const [rows] = await conn.execute(getItemQuery, [itemId]);
      const itemData = rows[0];

      await conn.execute(insertQuery, [itemId, userId, itemData.item]);

      conn.release();
      res.sendStatus(200);
    } catch (error) {
      conn.release();
      console.error("Error moving checklist data:", error);
      res
        .status(500)
        .json({ error: "An error occurred while moving checklist data" });
    }
  } catch (error) {
    console.error("Error moving checklist data:", error);
    res
      .status(500)
      .json({ error: "An error occurred while moving checklist data" });
  }
});

app.post("/addItem", async (req, res) => {
  try {
    const { tableName, newItem } = req.body;
    const userId = req.session.userId;

    const query = `INSERT INTO ${tableName} (item, user_id) VALUES (?, ?)`;
    const conn = await pool.getConnection();
    const [rows, fields] = await conn.execute(query, [newItem, userId]);
    conn.release();
    res.sendStatus(200);
  } catch (error) {
    console.error("Error adding checklist data:", error);
    res
      .status(500)
      .json({ error: "An error occurred while adding checklist data" });
  }
});

app.post("/checklist/updateChecklist", async (req, res) => {
  try {
    const userId = req.session.userId;
    const conn = await pool.getConnection();

    const tableData = [
      { table: "documents", checkedTable: "documents_checked" },
      { table: "general", checkedTable: "general_checked" },
      { table: "toiletries", checkedTable: "toiletries_checked" },
      { table: "clothes", checkedTable: "clothes_checked" },
      { table: "medicine", checkedTable: "medicine_checked" },
      { table: "ToDo", checkedTable: "ToDo_checked" },
    ];

    for (const table of tableData) {
      const query = `
        INSERT INTO ${table.table} (id, item, user_id)
        SELECT c.id, c.item, c.user_id
        FROM ${table.checkedTable} c
        LEFT JOIN ${table.table} d ON c.id = d.id
        WHERE c.user_id = ? AND d.id IS NULL
      `;
      const removeQuery = `DELETE FROM ${table.checkedTable} WHERE user_id = ?`;
      await conn.execute(query, [userId]);
      await conn.execute(removeQuery, [userId]);
    }

    conn.release();
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "An error occurred" });
  }
});

app.get("/logout", function (req, res) {
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
app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
