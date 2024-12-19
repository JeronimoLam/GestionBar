import { fileURLToPath } from 'url'
import path from 'path'
import { app, BrowserWindow, ipcMain } from 'electron'
import {createLocalDatabaseConnection} from './database.ts'
// import prisma from './database.config.ts'

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

  await createLocalDatabaseConnection(__dirname);


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

app.whenReady().then(() => {
  createWindow();

  ipcMain.handle('realizar-busqueda', async (event, termino) => {
    try {
      const resultados = await prisma.user.findMany(
      //   {
      //   where: {
      //     campo: {
      //       contains: termino,
      //     },
      //   },
      // }
    );
      return resultados;
    } catch (error) {
      console.error('Error en la búsqueda:', error);
      return [];
    }
  });
})

