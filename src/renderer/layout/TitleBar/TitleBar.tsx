/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import './style.css';

const Titlebar = () => {
  const [isActive, setIsActive] = useState<boolean>();
  const [isMaximized, setIsMaximized] = useState<boolean>();

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
          {isMaximized ? (
            <div className="section-windows-control_box">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                strokeLinejoin="round"
              >
                <circle
                  onClick={unmaximizeHandler}
                  className={
                    isActive
                      ? 'unmaximize-active_logo'
                      : 'unmaximize-inactive_logo'
                  }
                  cx="11.6"
                  cy="11.6"
                  r="11.4"
                />
              </svg>
            </div>
          ) : (
            <div className="section-windows-control_box">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                strokeLinejoin="round"
              >
                <circle
                  onClick={maximizeHandler}
                  className={
                    isActive ? 'maximize-active_logo' : 'maximize-inactive_logo'
                  }
                  cx="11.6"
                  cy="11.6"
                  r="11.4"
                />
              </svg>
            </div>
          )}
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
