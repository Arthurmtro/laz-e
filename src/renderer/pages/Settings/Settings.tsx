/* eslint-disable jsx-a11y/label-has-associated-control */
import { SetStateAction } from 'jotai';
import { useEffect } from 'react';
import Select from 'react-select';

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
  const [, setLayout] = useLayout();
  const { closeEvent, setCloseEvent } = useCloseEvent();
  const { lauchOnStartupStatus, setLauchOnStartupStatus } =
    useLauchOnStartupStatus();

  useEffect(() => {
    setLayout('Settings');
  }, [setLayout]);

  return (
    <div className={styles['settings-page']}>
      <article className={styles['theme-input']}>
        <label>Theme :</label>
        <Select
          onChange={(newValue) => {
            if (newValue === null) return;
            setTheme(newValue.value);
          }}
          onKeyDown={(event) => {
            if (event.key !== 'Enter') return;
            document.getElementById('theme-selector')?.click();
          }}
          value={options.find(({ value }) => value === theme)}
          options={options}
          className={styles.select}
          isSearchable={false}
        />
      </article>

      <article className={styles['input-checkbox']}>
        <input
          type="checkbox"
          id="syncWithApp"
          checked={!closeEvent ?? false}
          onKeyDown={(event) => {
            if (event.key !== 'Enter') return;
            setCloseEvent((prev) => !prev);
          }}
          onChange={() => setCloseEvent((prev) => !prev)}
        />
        <label htmlFor="syncWithApp">Minimise app when closing</label>
      </article>

      <article className={styles['input-checkbox']}>
        <input
          type="checkbox"
          id="lauchOnStartupStatus"
          onKeyDown={(event) => {
            if (event.key !== 'Enter') return;
            setLauchOnStartupStatus((prev) => !prev);
          }}
          checked={lauchOnStartupStatus ?? false}
          onChange={() => setLauchOnStartupStatus((prev) => !prev)}
        />
        <label htmlFor="lauchOnStartupStatus">
          Start app when system start
        </label>
      </article>
    </div>
  );
};

export default Settings;
