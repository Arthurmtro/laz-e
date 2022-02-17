/* eslint-disable no-nested-ternary */
import { NavLink as Link } from 'react-router-dom';

import styles from './NavLink.module.scss';

type NavLinkProps = {
  url: string;
  icon: string;
};

const NavLink = ({ url, icon }: NavLinkProps): JSX.Element => {
  const printSelectedIcon = () => {
    switch (icon) {
      case 'dashboard':
        return (
          <svg
            width="21px"
            height="21px"
            viewBox="0 0 21 21"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="m9.5.5h4c.5522847 0 1 .44771525 1 1v4c0 .55228475-.4477153 1-1 1h-4c-.55228475 0-1-.44771525-1-1v-4c0-.55228475.44771525-1 1-1zm-8 0h4c.55228475 0 1 .44771525 1 1v4c0 .55228475-.44771525 1-1 1h-4c-.55228475 0-1-.44771525-1-1v-4c0-.55228475.44771525-1 1-1zm8 8h4c.5522847 0 1 .44771525 1 1v4c0 .5522847-.4477153 1-1 1h-4c-.55228475 0-1-.4477153-1-1v-4c0-.55228475.44771525-1 1-1zm-8 0h4c.55228475 0 1 .44771525 1 1v4c0 .5522847-.44771525 1-1 1h-4c-.55228475 0-1-.4477153-1-1v-4c0-.55228475.44771525-1 1-1z"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              transform="translate(3 3)"
            />
          </svg>
        );
      case 'add':
        return (
          <svg
            version="1.1"
            id="Capa_1"
            x="0px"
            y="0px"
            viewBox="0 0 490.2 490.2"
            enableBackground="new 0 0 490.2 490.2"
            xmlSpace="preserve"
          >
            <g>
              <path
                d="M418.5,418.5c95.6-95.6,95.6-251.2,0-346.8s-251.2-95.6-346.8,0s-95.6,251.2,0,346.8S322.9,514.1,418.5,418.5z M89,89
                c86.1-86.1,226.1-86.1,312.2,0s86.1,226.1,0,312.2s-226.1,86.1-312.2,0S3,175.1,89,89z"
                fill="currentColor"
              />
              <path
                d="M245.1,336.9c3.4,0,6.4-1.4,8.7-3.6c2.2-2.2,3.6-5.3,3.6-8.7v-67.3h67.3c3.4,0,6.4-1.4,8.7-3.6c2.2-2.2,3.6-5.3,3.6-8.7
                c0-6.8-5.5-12.3-12.2-12.2h-67.3v-67.3c0-6.8-5.5-12.3-12.2-12.2c-6.8,0-12.3,5.5-12.2,12.2v67.3h-67.3c-6.8,0-12.3,5.5-12.2,12.2
                c0,6.8,5.5,12.3,12.2,12.2h67.3v67.3C232.8,331.4,238.3,336.9,245.1,336.9z"
                fill="currentColor"
              />
            </g>
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <Link
      className={({ isActive }) => (isActive ? styles.active : styles.link)}
      // className={(isActive) => styles.link + (isActive && styles.active)}
      to={url}
    >
      {printSelectedIcon()}
    </Link>
  );
};

export default NavLink;
