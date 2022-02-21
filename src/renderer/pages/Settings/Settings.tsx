/* eslint-disable jsx-a11y/label-has-associated-control */
import { SetStateAction } from 'jotai';
import { useEffect, useState } from 'react';
import Select from 'react-select';
import { ipcRenderer } from 'electron';

// Hooks
import useLauchOnStartupStatus from '../../hooks/useLauchOnStartupStatus';
import useCloseEvent from '../../hooks/useCloseEvent';
import useLayout from '../../hooks/useLayout';

import styles from './Settings.module.scss';

const options = [
  { value: 'light', label: 'Light' },
  { value: 'dark', label: 'Dark' },
];

type SettingsProps = {
  theme: string;
  setTheme: (update: SetStateAction<string>) => void;
};

const Settings = ({ theme, setTheme }: SettingsProps): JSX.Element => {
  const [version, setVersion] = useState();
  const [, setLayout] = useLayout();
  const { closeEvent, setCloseEvent } = useCloseEvent();
  const { lauchOnStartupStatus, setLauchOnStartupStatus } =
    useLauchOnStartupStatus();

  useEffect(() => {
    ipcRenderer.send('app_version');
    const versionLabel = document.getElementById('version');

    ipcRenderer.on('app_version', (event, arg) => {
      setVersion(arg.version);

      ipcRenderer.removeAllListeners('app_version');
      console.log('app_version: ', arg.version);

      if (!versionLabel) return;
      versionLabel.innerText = `Version ${arg.version}`;
    });
  }, []);

  useEffect(() => {
    setLayout('Settings');
  }, [setLayout]);

  return (
    <div className={styles['settings-page']}>
      <article className={styles['theme-input']}>
        <label>Theme :</label>
        <Select
          onChange={(newValue) => (newValue ? setTheme(newValue.value) : null)}
          value={options.find(({ value }) => value === theme)}
          className={styles.select}
          isSearchable={false}
          options={options}
          onKeyDown={(event) =>
            event.key === 'Enter'
              ? document.getElementById('theme-selector')?.click()
              : null
          }
        />
      </article>

      <article className={styles['input-checkbox']}>
        <input
          onChange={() => setCloseEvent((prev) => !prev)}
          checked={!closeEvent ?? false}
          id="syncWithApp"
          type="checkbox"
          onKeyDown={(event) =>
            event.key === 'Enter' ? setCloseEvent((prev) => !prev) : null
          }
        />
        <label htmlFor="syncWithApp">Minimise Laz-e when closing</label>
      </article>

      <article className={styles['input-checkbox']}>
        <input
          onChange={() => setLauchOnStartupStatus((prev) => !prev)}
          checked={lauchOnStartupStatus ?? false}
          id="lauchOnStartupStatus"
          type="checkbox"
          onKeyDown={(event) =>
            event.key === 'Enter'
              ? setLauchOnStartupStatus((prev) => !prev)
              : null
          }
        />
        <label htmlFor="lauchOnStartupStatus">
          Start Laz-e when system start
        </label>
      </article>

      <article>
        Version: <span id="versionLabel">{version}</span>
      </article>
    </div>
  );
};

export default Settings;
