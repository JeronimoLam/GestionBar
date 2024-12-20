import { app, BrowserWindow, ipcMain } from 'electron'
import path from 'path'
import { fileURLToPath } from 'url'
// import { createLocalDatabaseConnection } from './backend/database'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log(typeof(__dirname))

let win: BrowserWindow | null

// The built directory structure
//
// ├─┬─┬ dist
// │ │ └── index.html
// │ │
// │ ├─┬ dist-electron
// │ │ ├── main.js
// │ │ └── preload.js
// │
process.env.APP_ROOT = path.join(__dirname, '..')

// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL']
const MAIN_DIST = path.join(process.env.APP_ROOT, 'dist-electron')
const RENDERER_DIST = path.join(process.env.APP_ROOT, 'dist')

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL ? path.join(process.env.APP_ROOT, 'public') : RENDERER_DIST

async function createWindow() {
  win = new BrowserWindow({
    icon: path.join(process.env.VITE_PUBLIC, 'electron-vite.svg'),
    webPreferences: {
      preload: path.join(__dirname, './preload.mjs'), // Changed from preload.ts to preload.js
      contextIsolation: true,
      nodeIntegration: false,
    },
  })

  // Test active push message to Renderer-process.
  win.webContents.on('did-finish-load', () => {
    win?.webContents.send('main-process-message', (new Date).toLocaleString())
  })

  // await createLocalDatabaseConnection(__dirname);

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL)
  } else {
    win.loadFile(path.join(RENDERER_DIST, 'index.html'))
  }

   // Configurar el manejo de mensajes
   ipcMain.on('send-message', (event, message) => {
    console.log('Mensaje recibido en el proceso principal:', message)
    
    // Aquí puedes agregar la lógica para manejar diferentes tipos de mensajes
    switch (message) {
      case 'get-data':
        // Ejemplo: obtener datos y enviarlos de vuelta al renderer
        event.reply('receive-reply', 'Aquí están los datos solicitados')
        break
      case 'save-data':
        // Ejemplo: guardar datos
        event.reply('receive-reply', 'Datos guardados correctamente')
        break
      default:
        // Para cualquier otro mensaje
        event.reply('receive-reply', `Mensaje recibido: ${message}`)
    }
  })

  if (process.env.NODE_ENV === 'development') {
    win.webContents.openDevTools({
      mode: 'detach', // Opens DevTools in a separate window
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

