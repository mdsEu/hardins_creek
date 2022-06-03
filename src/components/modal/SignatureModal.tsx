import React, { useEffect } from 'react';
import styles from '../../styles/Modal.module.scss';
import { IModal } from '../../types';
import Image from 'next/image';
import quill from '../../../public/images/quill.png';

type Props = {
  modal: IModal,
  setSignature: (bool: boolean) => void,
}

const Modal: React.FC<Props> = ({ modal, setSignature }) => {
  // Here close the modal when has elapsed 4sec time
  useEffect(() => {
    setTimeout(() => {
      setSignature(false);
    }, 4000);
  }, [setSignature]);

  return (
    <div className={styles.modal__overlay}>
      <div className={styles.modal}>
        {modal.title && (
          <>
            <h4>{modal.title}</h4>
            <hr />
          </>
        )}
        {modal.message && <p>{modal.message}</p>}
        <Image
          src={quill}
          width={14}
          height={23}
          alt="quill"
        />
        <button
          className={`btn_transparent ${styles.modal__button}`}
          onClick={() => setSignature(false)}
          >Close</button>
      </div>
    </div>
  )
};

export default Modal;
