/* eslint-disable no-nested-ternary */
import styles from './Modal.module.scss';

type ModalProps = {
  openState: boolean;
  eventAccept: () => void;
  eventDeny: () => void;
};

const Modal = ({
  openState,
  eventAccept,
  eventDeny,
}: ModalProps): JSX.Element => {
  if (openState) {
    return (
      <>
        <div className={styles['modal-background']} />
        <div className={styles.modal}>
          <div>
            <h1>Do you really wanna delete this profile ?</h1>

            <div className={styles.buttons}>
              <button className={styles.deny} type="button" onClick={eventDeny}>
                No
              </button>
              <button
                className={styles.accept}
                type="button"
                onClick={eventAccept}
              >
                yes
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }
  return <></>;
};

export default Modal;
