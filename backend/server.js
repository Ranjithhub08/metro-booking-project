const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('./db');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5001;
const JWT_SECRET = process.env.JWT_SECRET || 'metro_secret_key';

app.use(cors());
app.use(express.json());

// --- Authentication Routes ---

app.post('/api/signup', async (req, res) => {
  const { username, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await db.run(
      'INSERT INTO users (username, password) VALUES (?, ?)',
      [username, hashedPassword]
    );
    res.status(201).json({ id: result.id, username });
  } catch (err) {
    if (err.message.includes('UNIQUE')) {
      return res.status(400).json({ error: 'Username already exists' });
    }
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const result = await db.query('SELECT * FROM users WHERE username = ?', [username]);
    const user = result.rows[0];
    if (user && await bcrypt.compare(password, user.password)) {
      const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: '24h' });
      res.json({ token, user: { id: user.id, username: user.username, city: user.city } });
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

app.post('/api/user/city', async (req, res) => {
  const { userId, city } = req.body;
  try {
    await db.run('UPDATE users SET city = ? WHERE id = ?', [city, userId]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// --- Booking Routes ---

app.get('/api/bookings/:userId', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM bookings WHERE user_id = ? ORDER BY timestamp DESC', [req.params.userId]);
    // Map SQLite snake_case to frontend expected names if needed (though I used similar names)
    const bookings = result.rows.map(b => ({
      ...b,
      source: b.source_station,
      destination: b.destination_station,
      travelTime: b.travel_time,
      cityId: b.city_id
    }));
    res.json(bookings);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

app.post('/api/bookings', async (req, res) => {
  const { id, userId, source, destination, fare, stops, travelTime, cityId, timestamp } = req.body;
  try {
    await db.run(
      'INSERT INTO bookings (id, user_id, source_station, destination_station, fare, stops, travel_time, city_id, timestamp) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [id, userId, source, destination, fare, stops, travelTime, cityId, timestamp]
    );
    res.status(201).json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
