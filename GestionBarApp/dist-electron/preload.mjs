"use strict";
const { contextBridge, ipcRenderer } = require("electron");
contextBridge.exposeInMainWorld("electronAPI", {
  sendMessage: (message) => ipcRenderer.send("send-message", message),
  onReceiveReply: (callback) => ipcRenderer.on("receive-reply", callback),
  initBD: () => ipcRenderer.send("init-bd")
});
