import { FC, ReactNode } from 'react';

// Components
import Titlebar from './TitleBar';
import NavLink from '../components/NavLink';

import Logo from '../../../assets/icon.svg';

import styles from './Layout.module.scss';

const Layout: FC<ReactNode> = ({ children }) => {
  const routes = [
    { url: '/', icon: 'dashboard' },
    { url: '/add-profile', icon: 'add' },
    { url: '/settings', icon: 'settings' },
  ];

  return (
    <>
      <Titlebar />
      <section className={styles.layout}>
        <section className={styles['menu-panel']}>
          <div className={styles['menu-content']}>
            <div className={styles['menu-links']}>
              {routes.map(({ url, icon }) => (
                <NavLink key={url} url={url} icon={icon} />
              ))}
            </div>
            {/* https://www.svgrepo.com/vectors */}
            <img className={styles['logo-img']} src={Logo} alt="logo" />
          </div>
        </section>
        <section className={styles['page-content']}>{children}</section>
      </section>
    </>
  );
};

export default Layout;
