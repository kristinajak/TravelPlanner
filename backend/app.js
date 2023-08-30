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
  WHERE (${tableName}.user_id = ? OR ${tableName}.user_id = 'default') `;
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
  const query = `SELECT ${tableName}_checked.id, ${tableName}_checked.item 
  FROM ${tableName}_checked 
  WHERE (${tableName}_checked.user_id = ? OR ${tableName}_checked.user_id = 'default')
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
        tableName,
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

// app.post("/moveItem", async (req, res) => {
//   try {
//     const { tableName, item } = req.body;
//     const userId = req.session.userId;

//     const query = `INSERT INTO ${tableName}_checked (item, user_id) VALUES (?, ?)`;
//     const conn = await pool.getConnection();
//     const [rows, fields] = await conn.execute(query, [item, userId]);
//     conn.release();
//     res.sendStatus(200);
//   } catch (error) {
//     console.error("Error moving checklist data:", error);
//     res
//       .status(500)
//       .json({ error: "An error occurred while moving checklist data" });
//   }
// });

app.post("/removeItem/:tableName/:itemId", async (req, res) => {
  try {
    const { tableName, itemId } = req.params;
    const userId = req.session.userId;

    if (!itemId) {
      return res.status(400).json({ error: "itemId is missing" });
    }

    const query = `INSERT INTO ${tableName}_removed (id, user_id) VALUES (?, ?)`;
    const conn = await pool.getConnection();

    try {
      await conn.execute(query, [itemId, userId || null]);
      conn.release();
      res.status(200).json({ message: "Item deleted successfully" });
    } catch (error) {
      conn.release();
      console.error("Error removing item:", error);
      res.status(500).json({ error: "An error occurred while removing item" });
    }
  } catch (error) {
    console.error("Error removing item:", error);
    res.status(500).json({ error: "An error occurred while removing item" });
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
