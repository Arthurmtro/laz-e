const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
  ipcRenderer: {
    on(channel, func) {
      // const validChannels = ['ipc-example'];
      // if (validChannels.includes(channel)) {
      // Deliberately strip event as it includes `sender`
      ipcRenderer.on(channel, (event, ...args) => func(...args));
      // }
    },
    send(channel, func) {
      ipcRenderer.send(channel, (event, ...args) => func(...args));
    },
    removeAllListeners(channel) {
      ipcRenderer.removeAllListeners(channel);
    },
    once(channel, func) {
      const validChannels = ['ipc-example'];
      if (validChannels.includes(channel)) {
        ipcRenderer.once(channel, (event, ...args) => func(...args));
      }
    },
    invoke(channel, ...args) {
      return ipcRenderer.invoke(channel, ...args);
    },
    notification(title, body, icon) {
      const notification = {
        title,
        body,
        icon,
      };
      // eslint-disable-next-line no-new
      const notif = new window.Notification(notification.title, notification);

      notif.onclick = () => {
        ipcRenderer.invoke('focus-window');
      };
    },
  },
});
