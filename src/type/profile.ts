export interface IShortcut {
  title: string;
  path: string;
  icon: string;
  // TODO: Handle if is automacion
}

export interface IProfile {
  id: string;
  title: string;
  shortcuts: IShortcut[];
  syncWithApp: boolean;
}
