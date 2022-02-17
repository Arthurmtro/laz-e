/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

// Hooks
import useLayout from '../../hooks/useLayout';

import './style.css';

const Titlebar = () => {
  const [isActive, setIsActive] = useState<boolean>();
  const [isMaximized, setIsMaximized] = useState<boolean>();

  const navigate = useNavigate();

  const [layout] = useLayout();

  window.electron.ipcRenderer.on('focused', () => {
    setIsActive(true);
  });

  window.electron.ipcRenderer.on('blurred', () => {
    setIsActive(false);
  });

  window.electron.ipcRenderer.on('maximized', () => {
    setIsMaximized(true);
  });

  window.electron.ipcRenderer.on('unmaximized', () => {
    setIsMaximized(false);
  });

  const minimizeHandler = () => {
    window.electron.ipcRenderer.invoke('minimize-event');
  };

  const maximizeHandler = () => {
    window.electron.ipcRenderer.invoke('maximize-event');
  };

  const unmaximizeHandler = () => {
    window.electron.ipcRenderer.invoke('unmaximize-event');
  };

  const closeHandler = () => {
    window.electron.ipcRenderer.invoke('close-event');
  };

  return (
    <div className="Titlebar">
      <div className={isActive ? 'Title-Bar' : 'Title-Bar-inactive'}>
        <div className="Titlebar-drag-region" />
        {layout !== 'Dashboard' && (
          <button
            className="Title-Bar__section-go-back"
            type="button"
            onClick={() => navigate(-1)}
          >
            <svg
              x="0px"
              y="0px"
              viewBox="0 0 471.2 471.2"
              enableBackground="0 0 471.2 471.2"
              xmlSpace="preserve"
              fill="none"
              stroke="none"
            >
              <path
                d="M396.7,0H74.5C33.4,0,0,33.4,0,74.5v322.2c0,41.1,33.4,74.5,74.5,74.5h322.2c41.1,0,74.5-33.4,74.5-74.5V74.5
			C471.2,33.5,437.7,0,396.7,0z M444.2,396.7c0,26.2-21.3,47.5-47.5,47.5H74.5c-26.2,0-47.5-21.3-47.5-47.5V74.5
			C27,48.3,48.3,27,74.5,27h322.2c26.2,0,47.5,21.3,47.5,47.5V396.7z"
              />
              <path
                d="M344.6,222.1H159.2l47.4-47.5c5.3-5.3,5.3-13.8,0-19.1s-13.8-5.3-19.1,0L117,226c-5.3,5.3-5.3,13.8,0,19.1l70.6,70.5
			c2.6,2.6,6.1,4,9.5,4s6.9-1.3,9.5-4c5.3-5.3,5.3-13.8,0-19.1L159.1,249h185.5c7.5,0,13.5-6,13.5-13.5S352.1,222.1,344.6,222.1z"
              />
            </svg>
          </button>
        )}
        <div className="Title-Bar__section-title">{layout}</div>
        <div className="Title-Bar__section-windows-control">
          <div className="section-windows-control_box">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              strokeLinejoin="round"
            >
              <circle
                onClick={minimizeHandler}
                className={
                  isActive ? 'minimize-active_logo' : 'minimize-inactive_logo'
                }
                cx="11.6"
                cy="11.6"
                r="11.4"
              />
            </svg>
          </div>

          <div className="section-windows-control_box">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              strokeLinejoin="round"
            >
              <circle
                onClick={() =>
                  isMaximized ? unmaximizeHandler() : maximizeHandler()
                }
                className={
                  isActive ? 'maximize-active_logo' : 'maximize-inactive_logo'
                }
                cx="11.6"
                cy="11.6"
                r="11.4"
              />
            </svg>
          </div>
          <div className="section-windows-control_box">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              strokeLinejoin="round"
            >
              <circle
                onClick={closeHandler}
                className={
                  isActive ? 'close-active_logo' : 'close-inactive_logo'
                }
                cx="11.6"
                cy="11.6"
                r="11.4"
              />
            </svg>
          </div>
        </div>
        <div
          style={isMaximized ? { display: 'none' } : {}}
          className="resizer"
        />
      </div>
    </div>
  );
};

export default Titlebar;
