const electron = require("electron")
const ipcMain = require("electron").ipcMain
const fs = require("fs")
const path = require("path")

const parseDataFile = (filePath: any, defaults: any) => {
    try {
        return JSON.parse(fs.readFileSync(filePath))
    } catch (error) {
        return defaults
    }
}
class Store {
    path: any
    data: any

    constructor(opts: any) {
        const userDataPath = (electron.app || electron.remote.app).getPath("userData")
        this.path = path.join(userDataPath, opts.configName + ".json")

        this.data = parseDataFile(this.path, opts.defaults)
    }

    get(key: any) {
        return this.data[key]
    }

    set(key: any, val: any) {
        try {
            this.data[key] = val
            fs.writeFileSync(this.path, JSON.stringify(this.data))
        } catch (error) {
            console.log(error)
        }
    }

    setProfileInfos(key: any, val: any) {
        try {
            this.data["profiles"][key] = val
            fs.writeFileSync(this.path, JSON.stringify(this.data))
        } catch (error) {
            console.log(error)
        }
    }

    addProfileInfos(val: any) {
        try {
            this.data["profiles"].push(val)
            fs.writeFileSync(this.path, JSON.stringify(this.data))
        } catch (error) {
            console.log(error)
        }
    }
}

const profileStore = new Store({
    configName: "user-profiles",
    defaults: {
        profiles: [
            {
                title: "Work",
                apps: [
                    {
                        appTitle: "Notion",
                        path: "C:\\Users\\arthu\\AppData\\Local\\Programs\\Notion\\Notion.exe",
                    },
                ],
            },
        ],
    },
})

ipcMain.handle("write-profiles-data", (event, key, value) => {
    return profileStore.setProfileInfos(key, value)
})

ipcMain.handle("add-profiles-data", (event, value) => {
    return profileStore.addProfileInfos(value)
})

ipcMain.handle("parse-profiles-data", () => {
    return profileStore.get("profiles")
})

export default Store
