const ipcRenderer = window.require("electron").ipcRenderer

export const openApp = (executablePath: any) => {
    ipcRenderer.invoke("open-app", executablePath)
}

export const parseProfileData = (setter: any) => {
    Promise.resolve(ipcRenderer.invoke("parse-profiles-data")).then((value) => {
        setter(value)
    })
}

export const editProfileData = (key: any, value: any, setter: any) => {
    Promise.resolve(ipcRenderer.invoke("edit-profiles-data", key, value)).then(() => {
        parseProfileData(setter)
    })
}

export const addProfileData = (value: any, setter: any) => {
    Promise.resolve(ipcRenderer.invoke("add-profiles-data", value)).then(() => {
        parseProfileData(setter)
    })
}

export const deleteProfileData = (title: string, setter: any) => {
    Promise.resolve(ipcRenderer.invoke("remove-profiles-data", title)).then(() => {
        parseProfileData(setter)
    })
}

export const isTitleValid = (title: string, setValidTitle: any) => {
    if (title.trim() === "") {
        setValidTitle(true)
    }
    Promise.resolve(ipcRenderer.invoke("check-profile-title", title)).then((res: boolean) => {
        setValidTitle(res)
    })
}

export const getFileIcon = async (path: string) => {
    return await Promise.resolve(ipcRenderer.invoke("get-file", path)).then((res) => {
        return res
    })
}
