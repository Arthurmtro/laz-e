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
  };

  const handleChange = async () => {
    const storedTheme = await getTheme();

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
