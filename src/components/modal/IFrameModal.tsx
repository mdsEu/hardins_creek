import React from 'react';
import styles from '../../styles/Modal.module.scss';
import { IiFrame } from '../../types';

type Props = {
  modal: IiFrame,
  setAgeError: (bool: boolean) => void,
}

// TODO: button to close modal
const Modal: React.FC<Props> = ({ modal, setAgeError }) => {

  return (
    <div className={styles.modal__overlay}>
      <div className={`${styles.modal} ${styles.i_frame}`} style={{width: `${modal.width}`}}>
        <iframe
          width="100%"
          height="684px"
          src={modal.url}
          frameBorder="0"
          // allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          // allowFullScreen
          title={modal.title}
        />
      </div>
      <button className={styles.close_button} onClick={(e) => setAgeError(false)}> X </button>
    </div>
  )
};

export default Modal;
