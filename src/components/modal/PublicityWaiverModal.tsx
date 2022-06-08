import React from 'react';
import styles from '@/styles/Modal.module.scss';
import { IModal } from '../../customTypes';

type Props = {
  modal: IModal,
  setShowConsent: (bool: boolean) => void,
}

const Modal: React.FC<Props> = ({ modal, setShowConsent }) => {

  const handleCloseModal = () => {
    setShowConsent(false);
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
        <p>I irrevocably permit Jim Beam Brands Co. (“<b>Beam</b>”) to use my signature on this web site for advertising, promotion, and other commercial purposes, according to the terms of this Publicity Waiver & Release (this “<b>Release</b>”) and in exchange for the opportunity to participate in Beam’s advertising and promotions.</p>

        <p>I understand that Beam is not obligated to (a) seek my approval for its uses of my signature at all. I waive all possible liabilities, claims, and demands arising from Beam’s exercise of its rights under this Release. This Release inures to the benefit of Beam, its parent(s), subsidiaries, affiliates, successors, and assigns. This Release is effective throughout the world in perpetuity.</p>

        <p>This Release will be governed by the laws of New York State without regard to its conflict-of-law provisions. Each party is and will remain an independent contractor. This Release is the entire agreement between the parties concerning the subject, and it supersedes any prior understandings, written or oral. Any modification of this Release must be mutually executed in writing. If any term of this Release is held to be invalid, illegal, or unenforceable by any court or other authority, such holding will not affect the validity, legality, or enforceability of any other term.</p>

        <hr />
        <button
          className={`btn_transparent ${styles.modal__button}`}
          onClick={handleCloseModal}
          >Ok</button>
      </div>
    </div>
  )
};

export default Modal;
