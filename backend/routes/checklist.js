const express = require("express");

const pool = require("../db");

const router = express.Router();

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

module.exports = {
  userChecklistItems,
  userChecklistItemsChecked,
};

router.get("/checklist", async (req, res) => {
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

router.get("/checklist_checked", async (req, res) => {
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

router.post("/moveItem/:tableName/:itemId", async (req, res) => {
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

router.post("/addItem", async (req, res) => {
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

router.post("/checklist/updateChecklist", async (req, res) => {
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

module.exports = router;
