const express = require("express");

const pool = require("../db");

const router = express.Router();

router.get("/itinerary", async (req, res) => {
  if (req.session.userId) {
    const userId = req.session.userId;
    const conn = await pool.getConnection();
    const [rows, fields] = await conn.query(
      `SELECT * FROM itinerary WHERE user_id = ${userId}`
    );
    conn.release();

    const data = rows.map((row) => {
      return {
        id: row.id,
        date: row.date,
        city: row.city,
        comments: row.comments,
      };
    });

    res.json(data);
  } else {
    res
      .status(500)
      .json({ error: "An error occurred while getting itinerary data" });
  }
});

router.post("/itinerary", async (req, res) => {
  try {
    const userId = req.session.userId;
    const newDate = req.body.date;
    const newCity = req.body.city;
    const newComments = req.body.comments;
    console.log(userId, newCity, newDate, newComments);
    const query = `INSERT INTO itinerary (date, city, comments, user_id) VALUES (?, ?, ?, ?)`;
    const conn = await pool.getConnection();
    const [result, fields] = await conn.execute(query, [
      newDate,
      newCity,
      newComments,
      userId,
    ]);
    conn.release();
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred adding an item" });
  }
});

router.post("/itinerary/:id/delete", async (req, res) => {
  const userId = req.session.userId;
  const id = req.params.id;
  const query = `DELETE FROM itinerary WHERE id = ? AND user_id = ?`;
  const conn = await pool.getConnection();
  const [result, fields] = await conn.execute(query, [id, userId]);
  conn.release();
  res.sendStatus(200);
});

module.exports = router;
