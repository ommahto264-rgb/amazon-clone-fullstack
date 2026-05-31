require('dotenv').config();
const pool = require('./config/db');

/*const createCartTable = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS cart (
        id SERIAL PRIMARY KEY,
        user_id INT NOT NULL,
        product_id INT NOT NULL,
        quantity INT DEFAULT 1,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
      );
    `);

    console.log('Cart table created successfully');
    process.exit();
  } catch (error) {
    console.log('Error:', error.message);
    process.exit(1);
  }
};

createCartTable();

const pool = require('./config/db')*/

const createOrdersTable = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS orders (
        id SERIAL PRIMARY KEY,
        user_id INT REFERENCES users(id),
        product_id INT REFERENCES products(id),
        quantity INT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `)

    console.log('Orders table created successfully')
    process.exit()

  } catch (error) {
    console.log(error.message)
    process.exit(1)
  }
}

createOrdersTable()