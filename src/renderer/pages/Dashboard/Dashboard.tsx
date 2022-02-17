import { FC, Fragment, ReactNode } from 'react';

// Libs
import { addProfileData } from '../../libs/ProfilesFuncs';
import useProfiles from '../../hooks/useProfiles';

// Components
import ProfileBox from '../../components/ProfileBox';

import styles from './Dashboard.module.scss';

const Dashboard: FC<ReactNode> = () => {
  const [profiles, setProfiles] = useProfiles();

  return (
    <div>
      <h1>Click to run profile</h1>

      <div className={styles['profile-grid']}>
        {profiles.map((profile) => (
          <Fragment key={profile.id}>
            <ProfileBox profile={profile} />
          </Fragment>
        ))}
      </div>
      <button
        type="button"
        onClick={() => {
          addProfileData(
            {
              id: '',
              title: 'Voici le titred awd adawd awd awd dawdawdawdawdawd awd ',
              shortcuts: [],
            },
            setProfiles
          );
        }}
      >
        Click for add
      </button>
    </div>
  );
};

export default Dashboard;
