require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { sequelize } = require('./models');
const usersRouter = require('./routes/users');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/users', usersRouter);

// simple health
app.get('/health', (req, res) => res.json({ status: 'ok' }));

// error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ error: err.message || 'Internal Server Error' });
});

const PORT = process.env.PORT || 4000;

async function start() {
  try {
    await sequelize.authenticate();
    // sync models - in production use migrations
    await sequelize.sync();
    console.log('Database connected & synced');
    app.listen(PORT, ()=> console.log(`Server running on port ${PORT}`));
  } catch (err) {
    console.error('DB connection error', err);
    process.exit(1);
  }
}

start();
