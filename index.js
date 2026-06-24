const express = require('express');
const Database = require('better-sqlite3');

const app = express();
const db = new Database('inventory.db');

app.use(express.json());

// Create table if it doesn't exist
db.exec(`
  CREATE TABLE IF NOT EXISTS vehicles (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    year INTEGER,
    make TEXT,
    model TEXT,
    price REAL,
    mileage INTEGER
  )
`);

// GET all vehicles
app.get('/vehicles', (req, res) => {
  const vehicles = db.prepare('SELECT * FROM vehicles').all();
  res.json(vehicles);
});

// GET one vehicle
app.get('/vehicles/:id', (req, res) => {
  const vehicle = db.prepare('SELECT * FROM vehicles WHERE id = ?').get(req.params.id);
  if (!vehicle) return res.status(404).json({ error: 'Not found' });
  res.json(vehicle);
});

// POST add a vehicle
app.post('/vehicles', (req, res) => {
  const { year, make, model, price, mileage } = req.body;
  const result = db.prepare(
    'INSERT INTO vehicles (year, make, model, price, mileage) VALUES (?, ?, ?, ?, ?)'
  ).run(year, make, model, price, mileage);
  res.json({ id: result.lastInsertRowid });
});

// PUT update a vehicle
app.put('/vehicles/:id', (req, res) => {
  const { year, make, model, price, mileage } = req.body;
  db.prepare(
    'UPDATE vehicles SET year=?, make=?, model=?, price=?, mileage=? WHERE id=?'
  ).run(year, make, model, price, mileage, req.params.id);
  res.json({ updated: true });
});

// DELETE a vehicle
app.delete('/vehicles/:id', (req, res) => {
  db.prepare('DELETE FROM vehicles WHERE id = ?').run(req.params.id);
  res.json({ deleted: true });
});

app.listen(3000, () => {
  console.log('Inventory API running on http://localhost:3000');
});