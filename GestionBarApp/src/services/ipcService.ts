import { ipcRenderer } from "electron";

class IpcService {
  async invoke<T = any>(channel: string, ...args: any[]): Promise<T> {
    return ipcRenderer.invoke(channel, ...args);
  }

  send(channel: string, ...args: any[]): void {
    ipcRenderer.send(channel, ...args);
  }

  on(channel: string, listener: (event: any, ...args: any[]) => void): void {
    ipcRenderer.on(channel, listener);
  }

  removeListener(channel: string, listener: (...args: any[]) => void): void {
    ipcRenderer.removeListener(channel, listener);
  }
}

const ipcService = new IpcService();
export default ipcService;
