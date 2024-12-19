import { fileURLToPath } from "url";
import path$1 from "path";
import { app, BrowserWindow } from "electron";
import path from "node:path";
import { createRequire } from "module";
const require2 = createRequire(import.meta.url);
const sqlite3 = require2("sqlite3").verbose();
const { open } = require2("sqlite");
async function createLocalDatabaseConnection(paths) {
  try {
    const db = await open({
      filename: path.join(paths, "../db/database.db"),
      // Mejor forma de unir rutas
      driver: sqlite3.Database
    });
    console.log("✅ Database connected successfully!");
    console.log("✅ Table created successfully!");
  } catch (error) {
    console.error("⚠️ Database Error:", error);
  }
}
const __filename = fileURLToPath(import.meta.url);
const __dirname = path$1.dirname(__filename);
console.log(typeof __dirname);
let win;
process.env.APP_ROOT = path$1.join(__dirname, "..");
const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];
const MAIN_DIST = path$1.join(process.env.APP_ROOT, "dist-electron");
const RENDERER_DIST = path$1.join(process.env.APP_ROOT, "dist");
process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL ? path$1.join(process.env.APP_ROOT, "public") : RENDERER_DIST;
async function createWindow() {
  win = new BrowserWindow({
    icon: path$1.join(process.env.VITE_PUBLIC, "electron-vite.svg"),
    webPreferences: {
      preload: path$1.join(__dirname, "preload.ts")
    }
  });
  win.webContents.on("did-finish-load", () => {
    win == null ? void 0 : win.webContents.send("main-process-message", (/* @__PURE__ */ new Date()).toLocaleString());
  });
  await createLocalDatabaseConnection(__dirname);
  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL);
  } else {
    win.loadFile(path$1.join(RENDERER_DIST, "index.html"));
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
