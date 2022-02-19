/* eslint global-require: off, no-console: off, promise/always-return: off */
import { app, BrowserWindow, shell, ipcMain, Tray, Menu } from 'electron';
import { autoUpdater } from 'electron-updater';
import log from 'electron-log';
import path from 'path';

import { resolveHtmlPath } from './util';
import Store from './storage';

export default class AppUpdater {
  constructor() {
    log.transports.file.level = 'info';
    autoUpdater.logger = log;
    // autoUpdater.checkForUpdatesAndNotify();
  }
}

let mainWindow: BrowserWindow | null = null;
let isQuiting: boolean;
let tray: Tray;

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

const isDevelopment =
  process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true';

if (isDevelopment) {
  require('electron-debug')();
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS'];

  return installer
    .default(
      extensions.map((name) => installer[name]),
      forceDownload
    )
    .catch(console.log);
};

const userPreferencesStore = new Store({
  // We'll call our data file 'user-preferences'
  configName: 'user-preferences',
  defaults: {
    windowBounds: { width: 920, height: 530 },
    CloseEvent: true,
    theme: 'dark',
  },
});

const createWindow = async () => {
  const { width, height } = userPreferencesStore.get('windowBounds');

  if (isDevelopment) {
    await installExtensions();
  }

  const RESOURCES_PATH = app.isPackaged
    ? path.join(process.resourcesPath, 'assets')
    : path.join(__dirname, '../../assets');

  const getAssetPath = (...paths: string[]): string => {
    return path.join(RESOURCES_PATH, ...paths);
  };

  mainWindow = new BrowserWindow({
    frame: false,
    show: false,
    width,
    height,
    minWidth: 850,
    minHeight: 530,
    backgroundColor: '#2A2A2A', // Dark
    // backgroundColor: '#fafafa', // Light
    icon: getAssetPath('icon.png'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: true,
    },
  });

  mainWindow.loadURL(resolveHtmlPath('index.html'));

  if (isDevelopment) {
    // mainWindow.webContents.openDevTools({ mode: 'detach' });
  }

  mainWindow.on('ready-to-show', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    if (process.env.START_MINIMIZED) {
      mainWindow.minimize();
    } else {
      mainWindow.show();
    }

    tray = new Tray(getAssetPath('icon.png'));
    tray.setToolTip('Laz-e');
    tray.setContextMenu(
      Menu.buildFromTemplate([
        {
          label: 'Show App',
          click() {
            mainWindow?.show();
          },
        },
        {
          label: 'Quit',
          click() {
            isQuiting = true;
            app.quit();
          },
        },
      ])
    );

    tray.on('click', () => {
      if (mainWindow?.isVisible()) {
        mainWindow?.hide();
      } else {
        mainWindow?.show();
      }
    });
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  mainWindow.on('close', (event) => {
    if (!mainWindow) return;
    if (!isQuiting) {
      event.preventDefault();
      mainWindow.hide();
      event.returnValue = false;
    }
  });

  mainWindow.on('maximize', () => {
    if (!mainWindow) return;
    mainWindow.webContents.send('maximized');
  });

  mainWindow.on('unmaximize', () => {
    if (!mainWindow) return;
    mainWindow.webContents.send('unmaximized');
  });

  mainWindow.on('resize', () => {
    if (!mainWindow) return;
    const { width: windowWidth, height: windowHeight } = mainWindow.getBounds();
    userPreferencesStore.set('windowBounds', {
      width: windowWidth,
      height: windowHeight,
    });
  });

  mainWindow.webContents.setWindowOpenHandler((data) => {
    shell.openExternal(data.url);
    return { action: 'deny' };
  });

  mainWindow.setMenu(null);

  // eslint-disable-next-line no-new
  new AppUpdater();
};

ipcMain.handle('get-theme', () => {
  return userPreferencesStore.getTheme();
});

ipcMain.handle('set-theme', (_event, newTheme: string) => {
  return userPreferencesStore.setTheme(newTheme);
});

ipcMain.handle('get-close-event', () => {
  return userPreferencesStore.getCloseEvent();
});

ipcMain.handle('set-close-event', (_event, newStatus: boolean) => {
  return userPreferencesStore.setCloseEvent(newStatus);
});

ipcMain.handle('minimize-event', () => {
  if (!mainWindow) return;
  mainWindow.minimize();
});

ipcMain.handle('maximize-event', () => {
  if (!mainWindow) return;
  mainWindow.maximize();
});

ipcMain.handle('unmaximize-event', () => {
  if (!mainWindow) return;
  mainWindow.unmaximize();
});

ipcMain.handle('close-event', () => {
  console.log('userPreferencesStore.data', userPreferencesStore.data);
  if (userPreferencesStore.data.closeEvent) {
    app.quit();
  } else {
    mainWindow?.close();
  }
});

ipcMain.handle('focus-window', () => {
  if (!mainWindow) return;
  console.log('FOCUSING');
  mainWindow.show();
  mainWindow.focus();
});

app.on('browser-window-focus', () => {
  if (!mainWindow) return;
  mainWindow.webContents.send('focused');
});

app.on('browser-window-blur', () => {
  if (!mainWindow) return;
  mainWindow.webContents.send('blurred');
});

app.on('before-quit', () => {
  isQuiting = true;
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app
  .whenReady()
  .then(() => {
    createWindow();
    app.on('activate', () => {
      if (mainWindow === null) createWindow();
    });
  })
  .catch(console.log);
