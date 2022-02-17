import { Dispatch, SetStateAction } from 'react';
import { toast } from 'react-toastify';

import { IProfile } from '../../type/profile';

const { ipcRenderer } = window.electron;

export const runProfile = (profileId: string) => {
  ipcRenderer.invoke('run-profile', profileId);
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

    parseProfileData(setter);
    toast.success('Profile deleted');
  } catch (error) {
    toast.error(`error :>> ${error}`);
  }
};

export const getFileIcon = async (path: string) => {
  try {
    return await Promise.resolve<string>(ipcRenderer.invoke('get-file', path));
  } catch (error) {
    toast.error(`error :>> ${error}`);
    return `Error => ${error}`;
  }
};
