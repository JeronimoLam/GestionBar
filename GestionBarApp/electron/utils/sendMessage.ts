export const sendMessage = (message: string): void => {
    window.electronAPI.sendMessage(message);
  };
  