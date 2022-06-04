import React, { useEffect } from 'react';
import styles from '@/styles/Modal.module.scss';
import { IiFrame } from '@/types/index';
import Image from 'next/image';
import close from '@/public/images/cross-close.svg';

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
          sandbox="allow-scripts allow-same-origin"
          title={modal.title}
        />
      </div>
      <button className={styles.close_button} onClick={(e) => setAgeError(false)}>
      <Image
          src={close}
          width={20}
          height={20}
          alt="close"
        />
      </button>
    </div>
  )
};

export default Modal;