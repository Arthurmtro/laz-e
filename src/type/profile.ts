export interface IShortcut {
    title: string
    path: string
    icon?: any
    //TODO: Handle if is automacion
}

export interface IProfile {
    title: string
    shortcuts: IShortcut[]
}
