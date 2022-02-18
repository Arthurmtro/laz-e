/* eslint-disable react-hooks/exhaustive-deps */
import { atom, useAtom } from 'jotai';
import { useEffect } from 'react';

// Libs
import { getTheme } from '../libs/ProfilesFuncs';
import toggleTheme from '../libs/theme';

const ThemeAtom = atom('dark');

export default function useTheme() {
  const [theme, setTheme] = useAtom(ThemeAtom);

  const init = async () => {
    setTheme(await getTheme());

    console.log('START storedTheme >> ', await getTheme());
    console.log('START Theme >> ', theme);
  };

  const handleChange = async () => {
    const storedTheme = await getTheme();

    console.log('storedTheme >> ', storedTheme);
    console.log('Theme >> ', theme);

    if (storedTheme !== theme) {
      toggleTheme();
      setTheme(await getTheme());
    }
  };

  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    handleChange();
  }, [theme]);

  return { theme, setTheme };
}
