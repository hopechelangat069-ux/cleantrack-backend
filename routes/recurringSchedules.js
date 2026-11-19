const express = require("express");
const router = express.Router();
const pool = require("../config/db");

// Create a recurring schedule
router.post("/", async (req, res) => {
  try {
    const { customer_id, location_id, waste_category_id, day_of_week, pickup_time, frequency, description } = req.body;
    const [result] = await pool.query(
      `INSERT INTO recurring_schedules (customer_id, location_id, waste_category_id, day_of_week, pickup_time, frequency, description) VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [customer_id, location_id, waste_category_id, day_of_week, pickup_time, frequency || 'weekly', description]
    );
    res.json({ message: "Schedule created", id: result.insertId });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to create schedule" });
  }
});

// Get all schedules for a customer
router.get("/customer/:customerId", async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT * FROM recurring_schedules WHERE customer_id = ? AND is_active = 1 ORDER BY created_at DESC`,
      [req.params.customerId]
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch schedules" });
  }
});

// Delete / deactivate a schedule
router.delete("/:id", async (req, res) => {
  try {
    await pool.query(`UPDATE recurring_schedules SET is_active = 0 WHERE id = ?`, [req.params.id]);
    res.json({ message: "Schedule deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete" });
  }
});

module.exports = router;