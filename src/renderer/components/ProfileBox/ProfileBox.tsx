import { useNavigate } from 'react-router-dom';
import styles from './ProfileBox.module.scss';

// Libs
import { deleteProfileData } from '../../libs/ProfilesFuncs';

// Types
import { IProfile } from '../../../type/profile';

// Hooks
import useProfiles from '../../hooks/useProfiles';

const ProfileBox = ({ profile }: { profile: IProfile }): JSX.Element => {
  const [, setProfiles] = useProfiles();
  const { id, title } = profile;
  const navigate = useNavigate();

  return (
    <div className={styles.box}>
      <div className={styles.left}>
        <h1>
          {title.slice(0, 25)}
          {title.length >= 25 && ' ...'}
        </h1>
        <div id="shortcuts icons">icons</div>
      </div>
      <div className={styles['actions-buttons']}>
        <button
          type="button"
          className={styles['delete-button']}
          onClick={() => deleteProfileData(id, setProfiles)}
        >
          <svg
            x="0px"
            y="0px"
            viewBox="0 0 172.541 172.541"
            enableBackground="new 0 0 172.541 172.541"
            xmlSpace="preserve"
          >
            <path
              d="M166.797,25.078h-13.672h-29.971V0H49.388v25.078H19.417H5.744v15h14.806l10,132.463h111.443l10-132.463h14.805V25.078z
		 M64.388,15h43.766v10.078H64.388V15z M128.083,157.541H44.46L35.592,40.078h13.796h73.766h13.796L128.083,157.541z"
            />
            <rect x="80.271" y="65.693" width="12" height="66.232" />
            <rect x="57.271" y="65.693" width="12" height="66.232" />
            <rect x="103.271" y="65.693" width="12" height="66.232" />
          </svg>
        </button>
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
        <button type="button" className={styles['run-button']}>
          Run
        </button>
      </div>
    </div>
  );
};

export default ProfileBox;
