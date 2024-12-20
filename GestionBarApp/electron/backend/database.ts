// import path from 'node:path';

// import { createRequire } from 'module'; // Importa createRequire desde el módulo 'module'
// const require = createRequire(import.meta.url); // Crea una función require compatible
// const sqlite3 = require('sqlite3').verbose(); // Importa SQLite3 usando require
// const { open } = require('sqlite');

// export async function createLocalDatabaseConnection(paths:string) {
//     try {
//       const db = await open({
//         filename: path.join(paths, '../db/database.db'), // Mejor forma de unir rutas
//         driver: sqlite3.Database,
//       });
  
//       console.log('✅ Database connected successfully!');
  
//     //    // Crear una tabla de ejemplo si no existe
//     //    await db.exec(`
//     //     CREATE TABLE IF NOT EXISTS users (
//     //       id INTEGER PRIMARY KEY AUTOINCREMENT,
//     //       name TEXT NOT NULL,
//     //       email TEXT UNIQUE NOT NULL
//     //     )
//     //   `);
  
//     //   await db.run(`INSERT INTO users (name, email) VALUES ('John Doe', 'john@example.com')`);
  
  
//       console.log('✅ Table created successfully!');
  
//     } catch (error) {
//       console.error('⚠️ Database Error:', error);
//     }
//   }
