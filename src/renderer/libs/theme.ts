import { setTheme } from './ProfilesFuncs';

export default async function toggleTheme() {
  document.documentElement.classList.add('theming');
  document.documentElement.addEventListener(
    'transitionend',
    () => {
      if (document.documentElement) {
        document.documentElement.classList.remove('theming');
      }
    },
    { once: true }
  );
  await setTheme(
    document.documentElement.classList.contains('light') ? 'dark' : 'light'
  );
  document.documentElement.classList.toggle('light');
}
