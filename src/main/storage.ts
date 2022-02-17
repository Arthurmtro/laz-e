/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
import { readFileSync, writeFileSync } from 'fs';
import { ipcMain, app } from 'electron';
import { join } from 'path';

// Types
import { IStore } from '../type/Store';
import { IProfile } from '../type/profile';

const parseDataFile = (filePath: string, defaults: any) => {
  try {
    return JSON.parse(readFileSync(filePath, { encoding: 'utf8', flag: 'r' }));
  } catch (error) {
    return defaults;
  }
};

class Store {
  path: string;

  data: any;

  constructor(opts: IStore) {
    const userDataPath = app.getPath('userData');
    this.path = join(userDataPath, `${opts.configName}.json`);

    this.data = parseDataFile(this.path, opts.defaults);
  }

  get(key: string) {
    return this.data[key];
  }

  set(key: string, val: IProfile | { width: number; height: number }) {
    try {
      this.data[key] = val;
      writeFileSync(this.path, JSON.stringify(this.data));
    } catch (error) {
      console.log(error);
    }
  }

  editProfileInfos(key: number, val: IProfile) {
    try {
      this.data.profiles[key] = val;
      writeFileSync(this.path, JSON.stringify(this.data));
    } catch (error) {
      console.log(error);
    }
  }

  addProfileInfos(val: IProfile) {
    try {
      this.data.profiles.push(val);
      writeFileSync(this.path, JSON.stringify(this.data));
    } catch (error) {
      console.log(error);
    }
  }

  removeProfileInfos(id: string) {
    try {
      this.data.profiles = this.data.profiles.filter(
        (profile: IProfile) => profile.id !== id
      );
      writeFileSync(this.path, JSON.stringify(this.data));
    } catch (error) {
      console.log(error);
    }
  }

  checkProfileTitle(title: string): boolean {
    try {
      if (
        this.data.profiles.some((profile: IProfile) => profile.title === title)
      ) {
        return false;
      }
      return true;
    } catch (error) {
      console.log(error);
      return true;
    }
  }
}

const profileStore = new Store({
  configName: 'user-profiles',
  defaults: {
    profiles: [],
  },
});

ipcMain.handle('edit-profiles-data', (_event, key, value) => {
  return profileStore.editProfileInfos(key, value);
});

ipcMain.handle('add-profiles-data', (_event, value) => {
  return profileStore.addProfileInfos(value);
});

ipcMain.handle('remove-profiles-data', (_event, id) => {
  return profileStore.removeProfileInfos(id);
});

ipcMain.handle('check-profile-title', (_event, title) => {
  return profileStore.checkProfileTitle(title);
});

ipcMain.handle('parse-profiles-data', () => {
  console.log('res => ', profileStore.get('profiles'));
  return profileStore.get('profiles');
});

export default Store;
