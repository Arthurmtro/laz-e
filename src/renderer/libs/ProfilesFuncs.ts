/* eslint-disable no-console */
import { IpcRenderer } from 'electron';
import { Dispatch, SetStateAction } from 'react';
import { toast } from 'react-toastify';

import { IProfile } from '../../type/profile';

// eslint-disable-next-line prefer-destructuring
const ipcRenderer: IpcRenderer = window.electron.ipcRenderer;

export const runProfile = (profileId: string) => {
  ipcRenderer.invoke('run-profile', profileId);
  ipcRenderer.removeAllListeners('run-profile');
};

export const parseProfileData = async (
  setter: Dispatch<SetStateAction<IProfile[]>>
) => {
  try {
    const value = await Promise.resolve<IProfile[]>(
      // eslint-disable-next-line no-console
      ipcRenderer.invoke('parse-profiles-data')
    );
    ipcRenderer.removeAllListeners('parse-profiles-data');
    setter(value === undefined ? [] : value);
  } catch (error) {
    toast.error(`error :>> ${error}`);
  }
};

export const editProfileData = async (
  editedProfile: IProfile,
  setter: Dispatch<SetStateAction<IProfile[]>>
) => {
  try {
    await Promise.resolve(
      ipcRenderer.invoke('edit-profiles-data', editedProfile)
    );
    ipcRenderer.removeAllListeners('edit-profiles-data');

    parseProfileData(setter);
    toast.success('Profile edited');
  } catch (error) {
    toast.error(`error :>> ${error}`);
  }
};

export const addProfileData = async (
  value: IProfile,
  setter: Dispatch<SetStateAction<IProfile[]>>
) => {
  try {
    await Promise.resolve(
      ipcRenderer.invoke('add-profiles-data', {
        ...value,
        id:
          String.fromCharCode(65 + Math.floor(Math.random() * 26)) + Date.now(),
      })
    );
    ipcRenderer.removeAllListeners('add-profiles-data');
    parseProfileData(setter);
    toast.success('Profile added');
  } catch (error) {
    toast.error(`error :>> ${error}`);
  }
};

export const deleteProfileData = async (
  id: string,
  setter: Dispatch<SetStateAction<IProfile[]>>
) => {
  try {
    await Promise.resolve(ipcRenderer.invoke('remove-profiles-data', id));
    ipcRenderer.removeAllListeners('remove-profiles-data');
    parseProfileData(setter);
    toast.success('Profile deleted');
  } catch (error) {
    toast.error(`error :>> ${error}`);
  }
};

export const getFileIcon = async (path: string) => {
  try {
    const fileIcon = await Promise.resolve<string>(
      ipcRenderer.invoke('get-file', path)
    );
    ipcRenderer.removeAllListeners('get-file');
    return fileIcon;
  } catch (error) {
    toast.error(`error :>> ${error}`);
    return `Error => ${error}`;
  }
};

export const getTheme = async () => {
  try {
    const theme = await Promise.resolve<string>(
      ipcRenderer.invoke('get-theme')
    );
    ipcRenderer.removeAllListeners('get-theme');
    return theme;
  } catch (error) {
    toast.error(`error :>> ${error}`);
    return `Error => ${error}`;
  }
};

export const setTheme = async (newTheme: string) => {
  try {
    await Promise.resolve<string>(ipcRenderer.invoke('set-theme', newTheme));
    return ipcRenderer.removeAllListeners('set-theme');
  } catch (error) {
    toast.error(`error :>> ${error}`);
    return `Error => ${error}`;
  }
};

export const getCloseEvent = async () => {
  try {
    const closeEvent = await Promise.resolve<boolean>(
      ipcRenderer.invoke('get-close-event')
    );
    ipcRenderer.removeAllListeners('get-close-event');
    return closeEvent;
  } catch (error) {
    toast.error(`error :>> ${error}`);
    return false;
  }
};

export const setCloseEvent = async (newValue: boolean) => {
  try {
    await Promise.resolve<boolean>(
      ipcRenderer.invoke('set-close-event', newValue)
    );
    return ipcRenderer.removeAllListeners('set-close-event');
  } catch (error) {
    toast.error(`error :>> ${error}`);
    return false;
  }
};

export const getLauchOnStartupStatus = async () => {
  try {
    const launchOnStartupStatus = await Promise.resolve<boolean>(
      ipcRenderer.invoke('launch-on-startup')
    );
    ipcRenderer.removeAllListeners('launch-on-startup');
    return launchOnStartupStatus;
  } catch (error) {
    toast.error(`error :>> ${error}`);
    return false;
  }
};

export const setLauchOnStartupStatus = async (newValue: boolean) => {
  try {
    await Promise.resolve<boolean>(
      ipcRenderer.invoke('set-launch-on-startup', newValue)
    );

    return ipcRenderer.removeAllListeners('set-launch-on-startup');
  } catch (error) {
    toast.error(`error :>> ${error}`);
    return false;
  }
};

export const getAppVersion = async () => {
  try {
    const appVersion = await Promise.resolve<string>(
      ipcRenderer.invoke('app_version')
    );

    ipcRenderer.removeAllListeners('app_version');

    console.log('appVersion', appVersion);

    return appVersion;
  } catch (error) {
    toast.error(`error :>> ${error}`);
    return '';
  }

  // ipcRenderer.on('app_version', async (_event, arg) => {
  //   // ipcRenderer.removeAllListeners('app_version');
  //   const { version } = await arg;
  //   console.log('arg', version);
  //   console.log('app_version: ', version);
  // });

  // ipcRenderer.on('update_available', () => {
  //   console.log('update_available');
  //   // ipcRenderer.removeAllListeners('update_available');
  // });

  // ipcRenderer.on('update_downloaded', () => {
  //   console.log('update_downloaded');
  //   // ipcRenderer.removeAllListeners('update_downloaded');
  // });
};

export const checkForUpdate = async () => {
  const updateAvailable = await Promise.resolve<boolean>(
    ipcRenderer.invoke('update_available')
  );
  ipcRenderer.removeAllListeners('update_available');

  return updateAvailable;
};
