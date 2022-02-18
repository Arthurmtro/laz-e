/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useEffect } from 'react';
import Select from 'react-select';

// Hooks
import useCloseEvent from '../../hooks/useCloseEvent';
import useLayout from '../../hooks/useLayout';
import useTheme from '../../hooks/useTheme';

import styles from './Settings.module.scss';

const options = [
  { value: 'light', label: 'Light' },
  { value: 'dark', label: 'Dark' },
];

const Settings = (): JSX.Element => {
  const { theme, setTheme } = useTheme();
  const [, setLayout] = useLayout();
  const { closeEvent, setCloseEvent } = useCloseEvent();

  useEffect(() => {
    setLayout('Settings');
  }, [setLayout]);

  return (
    <div className={styles['settings-page']}>
      <article className={styles['theme-input']}>
        <label>Theme :</label>
        <Select
          // @ts-ignore
          onChange={({ value }: { value: string }) => {
            if (value === null) return;
            setTheme(value);
          }}
          value={options.find(({ value }) => value === theme)}
          // @ts-ignore
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
          onChange={() => setCloseEvent((prev) => !prev)}
        />
        <label htmlFor="syncWithApp">Minimise app when closing</label>
      </article>
    </div>
  );
};

export default Settings;
