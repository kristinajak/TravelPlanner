const express = require("express");

const pool = require("../db");

const router = express.Router();

router.get("/budget", async (req, res) => {
  if (req.session.userId) {
    const userId = req.session.userId;
    const conn = await pool.getConnection();
    const [rows, fields] = await conn.query(
      `SELECT * FROM budget WHERE user_id = ${userId}`
    );

    conn.release();
    const data = rows.map((row) => {
      return {
        id: row.id,
        description: row.description,
        category: row.category,
        quantity: row.quantity,
        unitCost: row.unit_cost,
        total: row.total,
      };
    });

    res.json(data);
  } else {
    res.status(500).json({ error: "Data is not available" });
  }
});

router.post("/budget", async (req, res) => {
  try {
    const userId = req.session.userId;
    const newDescription = req.body.description;
    const newCategory = req.body.category;
    const newQuantity = req.body.quantity;
    const newUnitCost = req.body.unitCost;
    const newTotal = req.body.total;
    console.log(
      newDescription,
      newCategory,
      newQuantity,
      newUnitCost,
      newTotal,
      userId
    );

    const query = `INSERT INTO budget (description, category, quantity, unit_cost, user_id, total) VALUES (?, ?, ?, ?, ?, ?)`;
    const conn = await pool.getConnection();
    const [result, fields] = await conn.execute(query, [
      newDescription,
      newCategory,
      newQuantity,
      newUnitCost,
      userId,
      newTotal,
    ]);
    conn.release();
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred adding an item" });
  }
});

router.post("/budget/:id/delete", async (req, res) => {
  const userId = req.session.userId;
  const id = req.params.id;
  console.log(userId, id);
  const query = `DELETE FROM budget WHERE id = ? AND user_id = ?`;
  const conn = await pool.getConnection();
  const [result, fields] = await conn.execute(query, [id, userId]);
  conn.release();
  res.redirect("/budget");
});

module.exports = router;
