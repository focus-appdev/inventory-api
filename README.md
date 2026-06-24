# Inventory API

A REST API for managing vehicle inventory, built with Node.js, Express, and SQLite.

## Endpoints

| Method | Route | Description |
|--------|-------|-------------|
| GET | /vehicles | Get all vehicles |
| GET | /vehicles/:id | Get one vehicle |
| POST | /vehicles | Add a vehicle |
| PUT | /vehicles/:id | Update a vehicle |
| DELETE | /vehicles/:id | Delete a vehicle |

## Setup

```bash
npm install
node index.js
```

Server runs on http://localhost:3000