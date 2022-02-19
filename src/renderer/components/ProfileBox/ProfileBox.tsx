import { useNavigate } from 'react-router-dom';

// Libs
import { runProfile } from '../../libs/ProfilesFuncs';

// Types
import { IProfile } from '../../../type/profile';

import styles from './ProfileBox.module.scss';

type ProfileProps = {
  // eslint-disable-next-line react/require-default-props
  profile?: IProfile | Record<string, never>;
};

const ProfileBox = ({ profile = {} }: ProfileProps): JSX.Element => {
  const { id = '', title = '' } = profile;

  const navigate = useNavigate();

  if (profile.id) {
    return (
      <div className={styles.box}>
        <div className={styles.left}>
          <h1>{title.slice(0, 20)}</h1>
          {profile.shortcuts && (
            <div className={styles['shortcut-icons']}>
              {profile.shortcuts.slice(0, 20).map((shortcut) => (
                <div key={shortcut.path} className={styles['shortcut-box']}>
                  <img src={shortcut.icon} alt={`${shortcut.title} icon`} />
                  <span>{shortcut.title}</span>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className={styles['actions-buttons']}>
          <button
            type="button"
            className={styles['edit-button']}
            onClick={() => {
              navigate('/edit-profile', {
                state: {
                  profileId: id,
                },
              });
            }}
          >
            <svg
              x="0px"
              y="0px"
              viewBox="0 0 490.273 490.273"
              enableBackground="new 0 0 490.273 490.273"
              xmlSpace="preserve"
            >
              <path
                d="M313.548,152.387l-230.8,230.9c-6.7,6.7-6.7,17.6,0,24.3c3.3,3.3,7.7,5,12.1,5s8.8-1.7,12.1-5l230.8-230.8
            c6.7-6.7,6.7-17.6,0-24.3C331.148,145.687,320.248,145.687,313.548,152.387z"
              />
              <path
                d="M431.148,191.887c4.4,0,8.8-1.7,12.1-5l25.2-25.2c29.1-29.1,29.1-76.4,0-105.4l-34.4-34.4
            c-14.1-14.1-32.8-21.8-52.7-21.8c-19.9,0-38.6,7.8-52.7,21.8l-25.2,25.2c-6.7,6.7-6.7,17.6,0,24.3l115.6,115.6
            C422.348,190.187,426.748,191.887,431.148,191.887z M352.948,45.987c7.6-7.6,17.7-11.8,28.5-11.8c10.7,0,20.9,4.2,28.5,11.8
            l34.4,34.4c15.7,15.7,15.7,41.2,0,56.9l-13.2,13.2l-91.4-91.4L352.948,45.987z"
              />
              <path
                d="M162.848,467.187l243.5-243.5c6.7-6.7,6.7-17.6,0-24.3s-17.6-6.7-24.3,0l-239.3,239.5l-105.6,14.2l14.2-105.6
            l228.6-228.6c6.7-6.7,6.7-17.6,0-24.3c-6.7-6.7-17.6-6.7-24.3,0l-232.6,232.8c-2.7,2.7-4.4,6.1-4.9,9.8l-18,133.6
            c-0.7,5.3,1.1,10.6,4.9,14.4c3.2,3.2,7.6,5,12.1,5c0.8,0,1.5-0.1,2.3-0.2l133.6-18
            C156.748,471.587,160.248,469.887,162.848,467.187z"
              />
            </svg>
          </button>
          <button
            type="button"
            className={styles['run-button']}
            onClick={() => {
              runProfile(profile.id);
            }}
          >
            Run
          </button>
        </div>
      </div>
    );
  }
  return (
    <div
      role="button"
      className={styles['add-profile']}
      onKeyDown={(event) => {
        if (event.key !== 'Enter') return;
        navigate('/add-profile');
      }}
      tabIndex={0}
      onClick={() => {
        navigate('/add-profile');
      }}
    >
      <svg
        x="0px"
        y="0px"
        viewBox="0 0 455 455"
        enableBackground="new 0 0 455 455"
        xmlSpace="preserve"
      >
        <polygon
          points="455,212.5 242.5,212.5 242.5,0 212.5,0 212.5,212.5 0,212.5 0,242.5 212.5,242.5 212.5,455 242.5,455 242.5,242.5
	455,242.5 "
        />
      </svg>
    </div>
  );
};

export default ProfileBox;
