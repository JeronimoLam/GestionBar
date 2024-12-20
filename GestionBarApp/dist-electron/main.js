import { app, BrowserWindow, ipcMain } from "electron";
import path$1 from "path";
import { fileURLToPath } from "url";
import path from "node:path";
import { createRequire } from "module";
const require2 = createRequire(import.meta.url);
const sqlite3 = require2("sqlite3").verbose();
const { open } = require2("sqlite");
async function initBDController(paths) {
  console.log("initBD message received: ", paths);
  try {
    const db = await open({
      filename: path.join(paths, "../db/database.db"),
      // Mejor forma de unir rutas
      driver: sqlite3.Database
    });
    console.log("Database connected successfully!");
    await db.exec(`
                CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                email TEXT UNIQUE NOT NULL
                )
            `);
  } catch (error) {
    console.error("Database Error:", error);
  }
}
function handleGetData(event) {
  console.log("Manejando solicitud de datos");
  event.reply("receive-reply", "Aquí están los datos solicitados");
}
function handleSaveData(event) {
  console.log("Manejando guardado de datos");
  event.reply("receive-reply", "Datos guardados correctamente");
}
function handleDefaultMessage(event, message) {
  console.log("Manejando mensaje por defecto:", message);
  event.reply("receive-reply", `Mensaje recibido: ${message}`);
}
function hanldleSendMessage(event, message) {
  console.log("Mensaje recibido en el proceso principal:", message);
  switch (message) {
    case "get-data":
      handleGetData(event);
      break;
    case "save-data":
      handleSaveData(event);
      break;
    default:
      handleDefaultMessage(event, message);
  }
}
function allIpcHandlers(ipcMain2, __filename2, __dirname2) {
  ipcMain2.on("send-message", (event, message) => {
    hanldleSendMessage(event, message);
  });
  ipcMain2.on("init-bd", () => {
    initBDController(__dirname2);
  });
}
const __filename = fileURLToPath(import.meta.url);
const __dirname = path$1.dirname(__filename);
console.log(typeof __dirname);
let win;
process.env.APP_ROOT = path$1.join(__dirname, "..");
const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];
path$1.join(process.env.APP_ROOT, "dist-electron");
const RENDERER_DIST = path$1.join(process.env.APP_ROOT, "dist");
process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL ? path$1.join(process.env.APP_ROOT, "public") : RENDERER_DIST;
async function createWindow() {
  win = new BrowserWindow({
    icon: path$1.join(process.env.VITE_PUBLIC, "electron-vite.svg"),
    webPreferences: {
      preload: path$1.join(__dirname, "./preload.mjs"),
      // Changed from preload.ts to preload.js
      contextIsolation: true,
      nodeIntegration: false
    }
  });
  win.webContents.on("did-finish-load", () => {
    win == null ? void 0 : win.webContents.send("main-process-message", (/* @__PURE__ */ new Date()).toLocaleString());
  });
  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL);
  } else {
    win.loadFile(path$1.join(RENDERER_DIST, "index.html"));
  }
  allIpcHandlers(ipcMain, __filename, __dirname);
  if (process.env.NODE_ENV === "development") {
    win.webContents.openDevTools({
      mode: "detach"
      // Opens DevTools in a separate window
    });
  }
}
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
    win = null;
  }
});
app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
app.whenReady().then(createWindow);
