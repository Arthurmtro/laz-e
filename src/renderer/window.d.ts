// eslint-disable-next-line @typescript-eslint/naming-convention
interface ipcRenderer {
  on(channel: string, func: () => void): void;
  once(channel: string, func: () => void): void;
  invoke(channel: string): void;
  notification(title: string, body: string, icon: string): void;
}

declare interface Window {
  electron: { ipcRenderer };
}
