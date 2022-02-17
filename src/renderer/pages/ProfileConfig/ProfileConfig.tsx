// import styles from './ProfileConfig.module.scss';

import { useLocation, useNavigate } from 'react-router-dom';

type LocationState = {
  profileId: string;
};

const ProfileConfig = (): JSX.Element => {
  const location = useLocation();
  const navigate = useNavigate();

  const profileId = (location.state as LocationState)?.profileId;

  return (
    <div>
      {profileId && (
        <button type="button" onClick={() => navigate(-1)}>
          go back
        </button>
      )}
      <h1>{profileId ? 'Edit' : 'Add'}</h1>
      {profileId}
    </div>
  );
};

export default ProfileConfig;
