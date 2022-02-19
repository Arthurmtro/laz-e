/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
import { readFileSync, writeFileSync } from 'fs';
import { ipcMain, app } from 'electron';
import { spawn } from 'child_process';
import { join, resolve } from 'path';

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

  set(key: string, val: IProfile | any) {
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
      const executablePaths: IShortcut[] = this.data.profiles.find(
        ({ id }) => id === profileId
      )?.shortcuts;

      if (!executablePaths) return;

      // TODOS: Add listeners

      executablePaths.forEach(({ path }) => {
        const realPath = resolve(path);
        console.log(realPath, ' \n');

        if (realPath.length === 0) throw new Error("Path does't not exist");

        console.log('HEEEE >> ', path.split('').reverse().join(''));

        console.log(
          'test',
          path
            .split('')
            .reverse()
            .join('')
            .slice(
              path.split('').reverse().join('').indexOf('\\') + 1,
              path.length
            )
            .split('')
            .reverse()
            .join('')
        );

        console.log(
          'SHEEESHHH >> ',
          path.slice(0, path.split('').reverse().join('').indexOf('\\'))
        );

        const executedApp = spawn(path, {
          detached: !this.data.profiles.find(({ id }) => id === profileId)
            ?.syncWithApp,
          cwd: path
            .split('')
            .reverse()
            .join('')
            .slice(
              path.split('').reverse().join('').indexOf('\\') + 1,
              path.length
            )
            .split('')
            .reverse()
            .join(''),
        });

        executedApp.stdout.on('data', (data) => {
          console.log(`stdout: ${data}`);
        });

        executedApp.stderr.on('data', (data) => {
          console.error(`stderr: ${data}`);
        });

        executedApp.on('exit', (code, signal) => {
          console.log(
            `child process exited with code ${code} and signal ${signal}`
          );
        });
      });
    } catch (error) {
      console.log('ERROR >> ', error);
    }
  }

  getTheme() {
    try {
      return JSON.parse(
        readFileSync(this.path, { encoding: 'utf8', flag: 'r' })
      )?.theme;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  setTheme(newTheme: string) {
    try {
      this.data.theme = newTheme;
      writeFileSync(this.path, JSON.stringify(this.data));
    } catch (error) {
      console.log(error);
    }
  }

  getCloseEvent() {
    try {
      return JSON.parse(
        readFileSync(this.path, { encoding: 'utf8', flag: 'r' })
      )?.closeEvent;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  setCloseEvent(newStatus: boolean) {
    try {
      this.data.closeEvent = newStatus;
      writeFileSync(this.path, JSON.stringify(this.data));
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
