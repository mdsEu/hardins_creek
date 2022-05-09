import React from 'react';
import PropTypes from 'prop-types';
import SignaturePad from 'react-signature-pad-wrapper';

import styles from '../../styles/Signature.module.css';

import signatureHook from "./hooks/SignatureHook";

function Signature(props: any) {
  const {signatureRef, saveImg} = signatureHook(props.storeAction)

  return (
    <>
      <div className={styles.canvasWrapper}>
        <SignaturePad
          ref={signatureRef}
          options={{
            minWidth: 5,
            maxWidth: 10,
            penColor: 'rgb(66, 133, 244)'
          }} />
      </div>
      <button onClick={saveImg}>Save</button>
    </>
  )
}

Signature.propTypes = {
  storeAction: PropTypes.object
}

export default Signature
