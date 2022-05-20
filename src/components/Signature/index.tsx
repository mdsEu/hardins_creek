import React from 'react';
import PropTypes from 'prop-types';
import SignaturePad from 'react-signature-pad-wrapper';

import styles from '../../styles/Signature.module.scss';

import signatureHook from "./hooks/SignatureHook";

function Signature(props: any) {
  const {
    isErrorTerms,
    acceptedTerms,
    setAcceptedTerms,
    signatureRef,
    saveImg,
    cleanPad,
    onChangeTerms,
  } = signatureHook(props.storeAction)

  return (
    <div className={styles.comp_signature}>

      <div className={styles.canvasWrapper}>
        <SignaturePad
          ref={signatureRef}
          height={160}
          options={{
            minWidth: 5,
            maxWidth: 10,
            penColor: 'rgb(66, 133, 244)'
          }} />
          <div className={styles.clear_panel}>
            <a href="#clear" onClick={(e) => {
              e.preventDefault();
              cleanPad();
            }}>CLEAR</a>
          </div>
      </div>
      <div className={styles.wrap_accept_terms}>
        <label className={[isErrorTerms ? styles.error : '']}>
          <input type="checkbox" name="" id="" value={acceptedTerms} onChange={onChangeTerms} />
          <span className={styles.icon_check}>
            <svg height="24px" viewBox="0 0 24 24" width="24px"><path d="M0 0h24v24H0z" fill="none"/><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
          </span>
          I agree to let Hardin´s Creek display my signature on their website.
          {
            isErrorTerms && <div className={styles.error_terms}></div>
          }
        </label>
      </div>
      <button className="btn_transparent" onClick={saveImg}>SUBMIT <svg width="20" height="20" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="15.8104" cy="15.8427" r="15.7772" /><path d="M19.918 17.4494L20.5829 16.7844H19.6426H9.63852V15.3708H19.6426H20.5829L19.918 14.7059L17.4919 12.2798L18.4915 11.2802L23.2889 16.0776L18.4915 20.875L17.4919 19.8755L19.918 17.4494Z" strokeWidth="0.778996"/></svg></button>
    </div>
  )
}

Signature.propTypes = {
  storeAction: PropTypes.object
}

export default Signature
