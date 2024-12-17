import { fileURLToPath } from "url";
import path from "path";
import { app, BrowserWindow } from "electron";
import { createRequire } from "module";
const require2 = createRequire(import.meta.url);
const sqlite3 = require2("sqlite3").verbose();
const { open } = require2("sqlite");
console.log("Ricardo");
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
console.log("Filenamene: ", __filename);
console.log("Dirnomo: ", __dirname);
let win;
async function createDatabaseConnection() {
  try {
    const db = await open({
      filename: path.join(__dirname, "../database.sqlite"),
      // Mejor forma de unir rutas
      driver: sqlite3.Database
    });
    console.log("Database connected successfully!");
  } catch (error) {
    console.error("Database Error:", error);
  }
}
process.env.APP_ROOT = path.join(__dirname, "..");
const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];
const MAIN_DIST = path.join(process.env.APP_ROOT, "dist-electron");
const RENDERER_DIST = path.join(process.env.APP_ROOT, "dist");
process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL ? path.join(process.env.APP_ROOT, "public") : RENDERER_DIST;
async function createWindow() {
  win = new BrowserWindow({
    icon: path.join(process.env.VITE_PUBLIC, "electron-vite.svg"),
    webPreferences: {
      preload: path.join(__dirname, "preload.mjs")
    }
  });
  win.webContents.on("did-finish-load", () => {
    win == null ? void 0 : win.webContents.send("main-process-message", (/* @__PURE__ */ new Date()).toLocaleString());
  });
  await createDatabaseConnection();
  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL);
  } else {
    win.loadFile(path.join(RENDERER_DIST, "index.html"));
  }
  if (process.env.NODE_ENV === "development") {
    win.webContents.openDevTools({
      mode: "detach"
      // Abre DevTools en una ventana separada
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
export {
  MAIN_DIST,
  RENDERER_DIST,
  VITE_DEV_SERVER_URL
};
