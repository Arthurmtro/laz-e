/* eslint-disable no-nested-ternary */
import styles from './Modal.module.scss';

type ModalProps = {
  text: string;
  openState: boolean;
  eventAccept: () => void;
  eventDeny: () => void;
};

const Modal = ({
  text,
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
            <h1>{text}</h1>

            <div className={styles.buttons}>
              <button className={styles.deny} type="button" onClick={eventDeny}>
                Deny
              </button>
              <button
                className={styles.accept}
                type="button"
                onClick={eventAccept}
              >
                Accept
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
