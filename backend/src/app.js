const express = require('express');
const cors = require('cors');
const app = express();

const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require('./routes/orderRoutes')
const createProductRoutes = require('./routes/createProductRoutes')
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes)
app.use('/api/createProduct', createProductRoutes)

app.get('/', (req, res) => {
  res.json({ message: 'API is running' });
});

module.exports = app;