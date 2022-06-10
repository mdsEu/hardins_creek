import React, { useEffect } from 'react';
import styles from '@/styles/Modal.module.scss';
import { IModal } from '../../customTypes';
import Image from 'next/image';
import quill from '@/public/images/quill.svg';

type Props = {
  modal: IModal,
  setSignature: (bool: boolean) => void,
  setGoAgeGate: (bool: boolean) => void,
}

const Modal: React.FC<Props> = ({ modal, setSignature, setGoAgeGate }) => {
  // Here close the modal when has elapsed 4sec time
  useEffect(() => {
    setTimeout(() => {
      setSignature(false);
      setGoAgeGate(true);
    }, 12000);
  }, [setSignature, setGoAgeGate]);

  const handleCloseModal = () => {
    setSignature(false);
    setGoAgeGate(true);
  }

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
          className={styles.quill}
          src={quill}
          width={40}
          height={40}
          alt="quill"
        />
        <button
          className={`btn_transparent ${styles.modal__button}`}
          onClick={handleCloseModal}
          >Close</button>
      </div>
    </div>
  )
};

export default Modal;
