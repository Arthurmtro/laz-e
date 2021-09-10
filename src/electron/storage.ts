import { IStore } from "../type/Store"
import { IProfile } from "../type/profile"

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

    constructor(opts: IStore) {
        const userDataPath = (electron.app || electron.remote.app).getPath("userData")
        this.path = path.join(userDataPath, opts.configName + ".json")

        this.data = parseDataFile(this.path, opts.defaults)
    }

    get(key: string) {
        return this.data[key]
    }

    set(key: string, val: IProfile | any) {
        try {
            this.data[key] = val
            fs.writeFileSync(this.path, JSON.stringify(this.data))
        } catch (error) {
            console.log(error)
        }
    }

    editProfileInfos(key: number, val: IProfile) {
        try {
            this.data["profiles"][key] = val
            fs.writeFileSync(this.path, JSON.stringify(this.data))
        } catch (error) {
            console.log(error)
        }
    }

    addProfileInfos(val: IProfile) {
        try {
            this.data["profiles"].push(val)
            fs.writeFileSync(this.path, JSON.stringify(this.data))
        } catch (error) {
            console.log(error)
        }
    }

    removeProfileInfos(title: string) {
        try {
            this.data["profiles"] = this.data["profiles"].filter((profile: IProfile) => profile.title !== title)
            fs.writeFileSync(this.path, JSON.stringify(this.data))
        } catch (error) {
            console.log(error)
        }
    }

    checkProfileTitle(title: string): boolean {
        try {
            if (this.data["profiles"].some((profile: IProfile) => profile.title === title)) {
                return false
            } else {
                return true
            }
        } catch (error) {
            console.log(error)
            return true
        }
    }
}

const profileStore = new Store({
    configName: "user-profiles",
    defaults: {
        profiles: [],
    },
})

ipcMain.handle("edit-profiles-data", (event, key, value) => {
    return profileStore.editProfileInfos(key, value)
})

ipcMain.handle("add-profiles-data", (event, value) => {
    return profileStore.addProfileInfos(value)
})

ipcMain.handle("remove-profiles-data", (event, title) => {
    return profileStore.removeProfileInfos(title)
})

ipcMain.handle("check-profile-title", (event, title) => {
    return profileStore.checkProfileTitle(title)
})

ipcMain.handle("parse-profiles-data", () => {
    return profileStore.get("profiles")
})

export default Store
