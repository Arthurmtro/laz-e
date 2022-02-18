/* eslint-disable jsx-a11y/label-has-associated-control */
import { useLocation, useNavigate } from 'react-router-dom';
import { ChangeEvent, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

// Types
import { IProfile } from '../../../type/profile';

// Libs
import {
  deleteProfileData,
  editProfileData,
  addProfileData,
  getFileIcon,
} from '../../libs/ProfilesFuncs';

// Hooks
import useProfiles from '../../hooks/useProfiles';
import useLayout from '../../hooks/useLayout';

// Components
import Modal from '../../components/Modal';

import styles from './ProfileConfig.module.scss';

type LocationState = {
  profileId: string;
};

const INITIAL_STATE: IProfile = {
  id: '',
  title: '',
  shortcuts: [],
  syncWithApp: false,
};

const MAX_TITLE_LENGTH = 20;

const ProfileConfig = (): JSX.Element => {
  const [profiles, setProfiles] = useProfiles();
  const [, setLayout] = useLayout();
  const location = useLocation();
  const navigate = useNavigate();

  const profileId = (location.state as LocationState)?.profileId;

  const [openDeletionModal, setOpenDeletionModal] = useState<boolean>(false);
  const [editedProfile, setEditedProfile] = useState<IProfile>(
    profiles.find(({ id }) => id === profileId) || INITIAL_STATE
  );

  useEffect(() => {
    setLayout(profileId ? 'Edit profile' : 'Add new profile');
    setEditedProfile(
      profiles.find(({ id }) => id === profileId) || INITIAL_STATE
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profileId, setLayout]);

  const eventFileInput = async (event: ChangeEvent<HTMLInputElement>) => {
    try {
      if (editedProfile.shortcuts.length >= 20) return;
      // Can't handle more than 20 shortcuts

      const { files } = event.target;

      if (!files) return;

      // eslint-disable-next-line no-restricted-syntax
      for await (const file of files) {
        if (editedProfile.shortcuts.some((e) => e.path === file.path)) return;

        const iconImg = await getFileIcon(file.path);

        setEditedProfile((prevState) => ({
          ...prevState,
          shortcuts: prevState.shortcuts.concat({
            title: file.name,
            path: file.path,
            icon: iconImg,
          }),
        }));
      }
    } catch (error) {
      toast.error(`error :>> ${error}`);
    }
  };

  const eventSyncCheckbox = () => {
    setEditedProfile((prevState) => ({
      ...prevState,
      syncWithApp: !prevState.syncWithApp,
    }));
  };

  const eventSubmitConfiguration = () => {
    if (profileId) {
      editProfileData(editedProfile, setProfiles);
    } else {
      addProfileData(editedProfile, setProfiles);
    }

    navigate('/');
  };

  return (
    <div className={styles['profile-config-page']}>
      <Modal
        text="Profile deletion cannot be canceled"
        openState={openDeletionModal}
        eventDeny={() => setOpenDeletionModal(false)}
        eventAccept={() => {
          deleteProfileData(profileId, setProfiles);
          navigate('/');
        }}
      />
      <section className={styles['form-section']}>
        <div className={styles['title-zone']}>
          <input
            type="text"
            maxLength={MAX_TITLE_LENGTH}
            placeholder="Title"
            value={editedProfile.title}
            spellCheck="false"
            onChange={(event) =>
              setEditedProfile((prevState) => ({
                ...prevState,
                title: event.target.value.trimStart(),
              }))
            }
          />
          <span>
            {editedProfile.title.length <= 9 ? '0' : ''}
            {editedProfile.title.length} / {MAX_TITLE_LENGTH}
          </span>
        </div>

        <button
          onClick={() => document.getElementById('shortcutInput')?.click()}
          className={styles['input-file']}
          type="button"
        >
          <svg
            x="0px"
            y="0px"
            viewBox="0 0 54 54"
            enableBackground="0 0 54 54"
            xmlSpace="preserve"
          >
            <path
              d="M53,10.5H23.535l-3.703-5.555C19.646,4.667,19.334,4.5,19,4.5H1c-0.553,0-1,0.447-1,1v6v4v29.003
			C0,47.259,2.24,49.5,4.994,49.5h44.012C51.76,49.5,54,47.259,54,44.503V15.5v-4C54,10.947,53.553,10.5,53,10.5z M52,14.5H2v-2h21
			h29V14.5z M2,6.5h16.465l2.667,4H2V6.5z M52,44.503c0,1.652-1.343,2.997-2.994,2.997H4.994C3.343,47.5,2,46.155,2,44.503V16.5h50
			V44.503z"
            />
            <path
              d="M26.293,42.207C26.488,42.402,26.744,42.5,27,42.5s0.512-0.098,0.707-0.293l5.657-5.657c0.391-0.391,0.391-1.023,0-1.414
			s-1.023-0.391-1.414,0L28,39.086V21.5h-2v17.586l-3.95-3.95c-0.391-0.391-1.023-0.391-1.414,0s-0.391,1.023,0,1.414L26.293,42.207
			z"
            />
          </svg>
          Add application(s)
        </button>

        <input
          hidden
          multiple
          type="file"
          accept=".exe,js,py,msi,html"
          id="shortcutInput"
          onChange={eventFileInput}
        />

        <div className={styles['input-checkbox']}>
          <input
            type="checkbox"
            id="syncWithApp"
            onChange={eventSyncCheckbox}
            defaultChecked={editedProfile.syncWithApp}
          />
          <label htmlFor="syncWithApp">
            close everything when you exit app
          </label>
        </div>

        <div className={styles['actions-buttons']}>
          {profileId && (
            <button
              onClick={() => setOpenDeletionModal(true)}
              className={styles['delete-button']}
              type="button"
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
          )}
          <button
            type="submit"
            onClick={eventSubmitConfiguration}
            className={styles['submit-button']}
            disabled={
              editedProfile.shortcuts.length === 0 ||
              editedProfile.title.length <= 0
            }
          >
            Submit
          </button>
        </div>
      </section>

      {editedProfile.shortcuts.length >= 1 && (
        <section>
          <h3>Click on icon to delete</h3>
          {editedProfile.shortcuts.slice(0, 20).map((shortcut) => (
            <div key={shortcut.path} className={styles['shortcut-line']}>
              <img
                // eslint-disable-next-line jsx-a11y/no-noninteractive-element-to-interactive-role
                role="gridcell"
                onKeyDown={() => {}}
                src={shortcut.icon}
                alt={`${shortcut.title} icon`}
                onClick={() => {
                  setEditedProfile((prevState) => ({
                    ...prevState,
                    shortcuts: prevState.shortcuts.filter(
                      (allShortcut) => shortcut.path !== allShortcut.path
                    ),
                  }));
                }}
              />
              <div className={styles['shortcut-infos']}>
                <p>{shortcut.title}</p>
                <span>{shortcut.path}</span>
              </div>
            </div>
          ))}
        </section>
      )}
    </div>
  );
};

export default ProfileConfig;
