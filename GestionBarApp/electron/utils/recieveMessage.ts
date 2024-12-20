export const onReceiveReply = (callback: (reply: string) => void): void => {
    window.electronAPI.onReceiveReply((event, reply) => {
      callback(reply);
    });
  };
  
  