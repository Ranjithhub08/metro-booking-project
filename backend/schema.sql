-- Schema for Metro Booking System (SQLite Version)

-- Users Table
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    city TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Bookings Table
CREATE TABLE IF NOT EXISTS bookings (
    id TEXT PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    source_station TEXT NOT NULL,
    destination_station TEXT NOT NULL,
    fare INTEGER NOT NULL,
    stops INTEGER NOT NULL,
    travel_time TEXT,
    city_id TEXT NOT NULL,
    timestamp INTEGER NOT NULL,
    status TEXT DEFAULT 'confirmed'
);

-- Indices for performance
CREATE INDEX IF NOT EXISTS idx_bookings_user ON bookings(user_id);
CREATE INDEX IF NOT EXISTS idx_users_username ON users(username);
