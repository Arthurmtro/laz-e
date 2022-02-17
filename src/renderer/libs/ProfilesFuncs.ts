import { Dispatch, SetStateAction } from 'react';

import { IProfile } from '../../type/profile';

const { ipcRenderer } = window.electron;

export const openApp = (executablePath: string) => {
  ipcRenderer.invoke('open-app', executablePath);
};

export const parseProfileData = async (
  setter: Dispatch<SetStateAction<IProfile[]>>
) => {
  try {
    const value = await Promise.resolve<IProfile[]>(
      // eslint-disable-next-line no-console
      ipcRenderer.invoke('parse-profiles-data')
    );
    setter(value === undefined ? [] : value);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('error => ', error);
  }
};

export const editProfileData = async (
  key: string,
  value: IProfile,
  setter: Dispatch<SetStateAction<IProfile[]>>
) => {
  try {
    await Promise.resolve(ipcRenderer.invoke('edit-profiles-data', key, value));

    parseProfileData(setter);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('error => ', error);
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

    parseProfileData(setter);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('error => ', error);
  }
};

export const deleteProfileData = async (
  id: string,
  setter: Dispatch<SetStateAction<IProfile[]>>
) => {
  try {
    await Promise.resolve(ipcRenderer.invoke('remove-profiles-data', id));

    parseProfileData(setter);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('error => ', error);
  }
};

export const isTitleValid = async (
  title: string,
  setValidTitle: (arg: boolean) => void
) => {
  try {
    if (title.trim() === '') {
      setValidTitle(true);
    }

    const isValid = await Promise.resolve<boolean>(
      ipcRenderer.invoke('check-profile-title', title)
    );

    setValidTitle(isValid);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('error => ', error);
  }
};

export const getFileIcon = async (path: string) => {
  try {
    return await Promise.resolve<boolean>(ipcRenderer.invoke('get-file', path));
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('error => ', error);
    return `Error => ${error}`;
  }
};
