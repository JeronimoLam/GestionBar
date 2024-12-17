import { fileURLToPath } from 'url'
import path from 'path'
import { app, BrowserWindow } from 'electron'
import { createRequire } from 'module'; // Importa createRequire desde el módulo 'module'


const require = createRequire(import.meta.url); // Crea una función require compatible
const sqlite3 = require('sqlite3').verbose(); // Importa SQLite3 usando require
const { open } = require('sqlite');

console.log("Ricardo")

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
console.log("Filenamene: ", __filename)
console.log("Dirnomo: ", __dirname)


let win: BrowserWindow | null


async function createDatabaseConnection() {
  try {
    const db = await open({
      filename: path.join(__dirname, '../database.sqlite'), // Mejor forma de unir rutas
      driver: sqlite3.Database,
    });

    console.log('Database connected successfully!');
  } catch (error) {
    console.error('Database Error:', error);
  }
}

// The built directory structure
//
// ├─┬─┬ dist
// │ │ └── index.html
// │ │
// │ ├─┬ dist-electron
// │ │ ├── main.js
// │ │ └── preload.mjs
// │
process.env.APP_ROOT = path.join(__dirname, '..')

// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
export const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL']
export const MAIN_DIST = path.join(process.env.APP_ROOT, 'dist-electron')
export const RENDERER_DIST = path.join(process.env.APP_ROOT, 'dist')

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL ? path.join(process.env.APP_ROOT, 'public') : RENDERER_DIST


async function createWindow() {
  win = new BrowserWindow({
    icon: path.join(process.env.VITE_PUBLIC, 'electron-vite.svg'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.mjs'),
    },
  })

  // Test active push message to Renderer-process.
  win.webContents.on('did-finish-load', () => {
    win?.webContents.send('main-process-message', (new Date).toLocaleString())
  })

  await createDatabaseConnection();


  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL)
  } else {
    // win.loadFile('dist/index.html')
    win.loadFile(path.join(RENDERER_DIST, 'index.html'))
  }

  if (process.env.NODE_ENV === 'development') {
    win.webContents.openDevTools({
      mode: 'detach', // Abre DevTools en una ventana separada
    });
    
  }
  
}

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
    win = null
  }
})

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

app.whenReady().then(createWindow)

