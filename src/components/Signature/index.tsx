import React from 'react';
import PropTypes from 'prop-types';
import SignaturePad from 'react-signature-pad-wrapper';

import styles from '../../styles/Signature.module.scss';

import signatureHook from "./hooks/SignatureHook";
import { asset } from '../../helpers';

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
      <button className="btn_transparent" onClick={saveImg}>SUBMIT <img src={asset('images/page-signature/arrow_submit.png')} /></button>
    </div>
  )
}

Signature.propTypes = {
  storeAction: PropTypes.object
}

export default Signature
