const ipcRenderer = window.require("electron").ipcRenderer

export const openApp = (executablePath: any) => {
    ipcRenderer.invoke("open-app", executablePath)
}

export const parseProfileData = (setter: any) => {
    Promise.resolve(ipcRenderer.invoke("parse-profiles-data")).then((value) => {
        setter(value)
    })
}

export const writeProfileData = (key: any, value: any, setter: any) => {
    ipcRenderer.invoke("write-profiles-data", key, value)
    parseProfileData(setter)
}

export const addProfileData = (value: any, setter: any) => {
    ipcRenderer.invoke("add-profiles-data", value)
    parseProfileData(setter)
}
