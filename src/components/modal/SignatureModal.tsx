import React, { useEffect } from 'react';
import styles from '@/styles/Modal.module.scss';
import { IModal } from '../../customTypes';
import Image from 'next/image';
import quill from '@/public/images/quill.png';

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
    }, 4600);
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
          src={quill}
          width={14}
          height={23}
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
