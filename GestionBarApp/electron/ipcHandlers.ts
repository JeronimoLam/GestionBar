// import { ipcMain } from 'electron';
// import db from './database';

// // Ruta IPC: Obtener todos los productos
// ipcMain.handle('get-productos', () => {
//   return db.prepare('SELECT * FROM productos').all();
// });

// // Ruta IPC: Agregar un producto
// ipcMain.handle('add-producto', (event, nombre: string, precio: number) => {
//   db.prepare('INSERT INTO productos (nombre, precio) VALUES (?, ?)').run(nombre, precio);
//   return { success: true };
// });
