import React from 'react';
import styles from '@/styles/Modal.module.scss';
import { IModal } from '../../customTypes';
import { useMediaQuery } from 'react-responsive'

type Props = {
  modal: IModal,
  noThanks: (bool: boolean) => void,
}

const Modal: React.FC<Props> = ({ modal, noThanks }) => {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isDesktop = useMediaQuery({ minWidth: 1199 });
  const urlSignUp = 'https://www.beamdistilling.com/sign-up';

  return (
    <div className={styles.modal__overlay}>
      <div className={styles.modal} style={{width: `${isDesktop ? '450' : modal.width}px`}}>
        {modal.title && (
          <>
            <h4>{modal.title}</h4>
            <hr />
          </>
        )}
        {modal.message && <p className={styles.sign}>{modal.message}</p>}
        <a
          className={`btn_transparent ${styles.modal__button} ${styles.btn_sign}`}
          href={`${urlSignUp}`}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => noThanks(false)}
          >Sign Up</a>
        <button
          className={`btn_transparent ${styles.modal__button} ${styles.btn_sign}`}
          onClick={() => noThanks(false)}
          >No Thanks</button>
      </div>
    </div>
  )
};

export default Modal;
