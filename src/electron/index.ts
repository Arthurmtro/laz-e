import { app, BrowserWindow } from "electron"
import { ipcMain } from "electron"
import isDev from "electron-is-dev"
import { execFile } from "child_process"
// const isDev = require("electron-is-dev")
// const ipcMain = require("electron").ipcMain

import Store from "./storage"

declare const MAIN_WINDOW_WEBPACK_ENTRY: string

if (require("electron-squirrel-startup")) {
    // eslint-disable-line global-require
    app.quit()
}

const shortcutstore = new Store({
    // We'll call our data file 'user-preferences'
    configName: "user-preferences",
    defaults: {
        windowBounds: { width: 720, height: 530 },
    },
})

let mainWindow: any

const createWindow = (): void => {
    let { width, height } = shortcutstore.get("windowBounds")
    // Create the browser window.

    mainWindow = new BrowserWindow({
        width: width,
        height: height,
        minWidth: 640,
        minHeight: 530,
        frame: false,
        backgroundColor: "#2A2A2A",
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true,
            contextIsolation: false,
        },
    })

    mainWindow.setMenu(null)

    mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY)

    if (isDev) {
        mainWindow.webContents.openDevTools({ mode: "detach" })
    }

    mainWindow.on("closed", (): any => (mainWindow = null))

    mainWindow.on("maximize", () => {
        mainWindow.webContents.send("maximized")
    })

    mainWindow.on("unmaximize", () => {
        mainWindow.webContents.send("unmaximized")
    })

    mainWindow.on("resize", () => {
        let { width, height } = mainWindow.getBounds()
        shortcutstore.set("windowBounds", { width, height })
    })
}

app.on("ready", createWindow)

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit()
    }
})

app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
})

// Titlebar event
ipcMain.handle("minimize-event", () => {
    mainWindow.minimize()
})

ipcMain.handle("maximize-event", () => {
    mainWindow.maximize()
})

ipcMain.handle("unmaximize-event", () => {
    mainWindow.unmaximize()
})

ipcMain.handle("close-event", () => {
    app.quit()
})

app.on("browser-window-focus", () => {
    mainWindow.webContents.send("focused")
})

app.on("browser-window-blur", () => {
    mainWindow.webContents.send("blurred")
})

// Open App event
ipcMain.handle("open-app", (event, executablePath) => {
    execFile(executablePath, (err: any, data: any) => {
        if (err) {
            console.log(err)
            return
        }
    })
})
