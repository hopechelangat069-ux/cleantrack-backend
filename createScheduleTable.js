const pool = require("./config/db");

async function run() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS recurring_schedules (
      id INT AUTO_INCREMENT PRIMARY KEY,
      customer_id INT NOT NULL,
      location_id INT NOT NULL,
      waste_category_id INT NOT NULL,
      day_of_week VARCHAR(20) NOT NULL,
      pickup_time TIME NOT NULL,
      frequency VARCHAR(20) DEFAULT 'weekly',
      description TEXT,
      is_active TINYINT DEFAULT 1,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);
  console.log("Table recurring_schedules created!");
  process.exit(0);
}
run();