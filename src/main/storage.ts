/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
import { readFileSync, writeFileSync } from 'fs';
import { exec, execFile } from 'child_process';
import { ipcMain, app } from 'electron';
import { join } from 'path';

// Types
import { IProfile, IShortcut } from '../type/profile';
import { IStore } from '../type/Store';

const parseDataFile = (filePath: string, defaults: any) => {
  try {
    return JSON.parse(readFileSync(filePath, { encoding: 'utf8', flag: 'r' }));
  } catch (error) {
    return defaults;
  }
};

class Store {
  path: string;

  data: IProfile[] | any;

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

  editProfileInfos(editedProfile: IProfile) {
    try {
      this.removeProfileInfos(editedProfile.id);

      this.addProfileInfos(editedProfile);
    } catch (error) {
      console.log(error);
    }
  }

  addProfileInfos(val: IProfile) {
    try {
      this.data.profiles.push({
        ...val,
        shortcuts: val.shortcuts.slice(0, 20),
      });
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

  runProfileWithId(profileId: string) {
    try {
      const executablePaths = this.data.profiles.find(
        ({ id }) => id === profileId
      )?.shortcuts;

      if (!executablePaths) return;

      console.log('executablePaths', executablePaths);

      if (this.data.profiles.find(({ id }) => id === profileId)?.syncWithApp) {
        executablePaths.forEach((executablePath: IShortcut) => {
          execFile(executablePath.path, (error, stdout, stderr) => {
            if (error) {
              throw error;
            }
            console.log(stdout);
            console.log(stderr);
          });
        });
      } else {
        executablePaths.forEach((executablePath: IShortcut) => {
          exec(executablePath.path, (error, stdout, stderr) => {
            if (error) {
              throw error;
            }
            console.log(stdout);
            console.log(stderr);
          });
        });
      }
    } catch (error) {
      console.log(error);
    }
  }
}

const profileStore = new Store({
  configName: 'user-profiles',
  defaults: {
    profiles: [],
  },
});

ipcMain.handle('edit-profiles-data', (_event, editedProfile) => {
  return profileStore.editProfileInfos(editedProfile);
});

ipcMain.handle('add-profiles-data', (_event, value) => {
  return profileStore.addProfileInfos(value);
});

ipcMain.handle('remove-profiles-data', (_event, id) => {
  return profileStore.removeProfileInfos(id);
});

ipcMain.handle('parse-profiles-data', () => {
  console.log('res => ', profileStore.get('profiles'));
  return profileStore.get('profiles');
});

ipcMain.handle('get-file', (_event, filePath) => {
  return app.getFileIcon(filePath).then((fileIcon) => {
    console.log(`fileIcon`, fileIcon.toDataURL());
    return fileIcon.toDataURL();
  });
});

ipcMain.handle('run-profile', (_event, profileId) => {
  return profileStore.runProfileWithId(profileId);
});

export default Store;
