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
    }
  };

  useEffect(() => {
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    handleChange();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [theme]);

  return { theme, setTheme };
}
