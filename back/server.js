require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { sequelize } = require('./config/postgres');

// Import routes
const menuRoutes = require('./routes/menu.routes');
const orderRoutes = require('./routes/order.routes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/menu', menuRoutes);
app.use('/api/orders', orderRoutes);

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log('MongoDB Connection Error:', err));

// PostgreSQL Connection & Server Start
sequelize.authenticate()
  .then(() => {
    console.log('PostgreSQL Connected');
    sequelize.sync();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => console.log('PostgreSQL Connection Error:', err));
