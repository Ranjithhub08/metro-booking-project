const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

const dbPath = path.resolve(__dirname, 'metro.db');
const db = new sqlite3.Database(dbPath);

// Wrapper for async queries
const query = (text, params = []) => {
  return new Promise((resolve, reject) => {
    // Convert $1, $2 to ? for SQLite if needed, but we'll use ? in our code
    db.all(text, params, (err, rows) => {
      if (err) reject(err);
      else resolve({ rows });
    });
  });
};

const run = (text, params = []) => {
  return new Promise((resolve, reject) => {
    db.run(text, params, function(err) {
      if (err) reject(err);
      else resolve({ id: this.lastID, changes: this.changes });
    });
  });
};

// Initialize schema
const initDB = () => {
  const schemaPath = path.resolve(__dirname, 'schema.sql');
  const schema = fs.readFileSync(schemaPath, 'utf8');
  
  // SQLite doesn't support multiple statements in one run() easily
  // so we split by semicolon
  const statements = schema.split(';').filter(s => s.trim());
  
  db.serialize(() => {
    statements.forEach(stmt => {
      db.run(stmt, (err) => {
        if (err) console.error('Schema Error:', err.message);
      });
    });
  });
  console.log('SQLite Database Initialized at', dbPath);
};

initDB();

module.exports = { query, run, db };
