import { IpcMainEvent } from 'electron';

import {initBDController} from './utils/init_bd';
import {hanldleSendMessage} from './utils/send_messages';


export function allIpcHandlers(ipcMain: Electron.IpcMain, __filename: string, __dirname: string) {
  ipcMain.on('send-message', (event, message) => { hanldleSendMessage(event, message);});
  ipcMain.on('init-bd', () => {initBDController(__dirname)});
}

