import { FC, Fragment, ReactNode, useEffect } from 'react';

// Hooks
import useProfiles from '../../hooks/useProfiles';
import useLayout from '../../hooks/useLayout';

// Components
import ProfileBox from '../../components/ProfileBox';

import styles from './Dashboard.module.scss';

const Dashboard: FC<ReactNode> = () => {
  const [profiles] = useProfiles();
  const [, setLayout] = useLayout();

  useEffect(() => {
    setLayout('Dashboard');
  }, [setLayout]);

  return (
    <div className={styles['profile-grid']}>
      {profiles.map((profile) => (
        <Fragment key={profile.id}>
          <ProfileBox profile={profile} />
        </Fragment>
      ))}
      <ProfileBox />
    </div>
  );
};

export default Dashboard;
