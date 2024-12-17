// import Database from 'better-sqlite3';
// import path from 'node:path';

// // Ruta de la base de datos
// const dbPath = path.join(__dirname, '../db/database.db');

// // Inicializamos SQLite
// const db = new Database(dbPath);

// // Crear la tabla si no existe
// db.prepare(`
//   CREATE TABLE IF NOT EXISTS productos (
//     id INTEGER PRIMARY KEY AUTOINCREMENT,
//     nombre TEXT NOT NULL,
//     precio REAL NOT NULL
//   )
// `).run();

// export default db;
