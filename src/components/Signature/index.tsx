/* eslint-disable @next/next/no-img-element */
import React from 'react';
import Link from 'next/link'
import PropTypes from 'prop-types';
import SignaturePad from 'react-signature-pad-wrapper';
import { useMediaQuery } from 'react-responsive'

import styles from '../../styles/Signature.module.scss';

import signatureHook from "./hooks/SignatureHook";

import { IModal } from '../../customTypes';
function Signature(props: any) {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const { storeAction, setSignature, setShowConsent } = props;

  const {
    isErrorTerms,
    isErrorConsent,
    acceptedTerms,
    acceptedConsent,
    signatureRef,
    saveImg,
    cleanPad,
    onChangeTerms,
    onChangeConsent,
    alertSignatureEmpty,
  } = signatureHook(storeAction, setSignature)

  return (
    <div className={styles.comp_signature}>
      <div className={styles.canvasWrapper}>
        <SignaturePad
          ref={signatureRef}
          height={isMobile ? 90 : 160}
          options={{
            minWidth: 1.5,
            maxWidth: 3.5,
            penColor: '#D3C3A2'
          }} />
          <div className={`${styles.clear_panel} ${alertSignatureEmpty && styles.error}`}>
            <a href="#clear" onClick={(e) => {
              e.preventDefault();
              cleanPad();
            }}>CLEAR SIGNATURE</a>
          </div>
      </div>
      <div className={styles.wrap_accept_terms}>
        <label className={isErrorTerms ? styles.error : ''}>
          <input type="checkbox" name="" id="" defaultValue={acceptedTerms ? "true" : "false"} checked={acceptedTerms} onChange={onChangeTerms} />
          <span className={`${styles.term} ${isErrorTerms ? styles.error_terms : ''}`}>
            *I consent to the collection and processing of my personal data in line with the Beam Suntory <Link href={'https://www.beamsuntory.com/index.php/en/privacy-policy'}>
              <a target="_blank">
                Privacy Policy
              </a>
            </Link>.
          </span>
        </label>
      </div>
      <div className={styles.wrap_accept_terms}>
        <label className={isErrorConsent ? styles.error : ''}>
          <input type="checkbox" name="" id="" defaultValue={acceptedConsent ? "true" : "false"} checked={acceptedConsent} onChange={onChangeConsent} />
          <span className={`${styles.term} ${styles.term_secondary} ${isErrorConsent ? styles.error_terms : ''}`}>
              *I consent to the use of my signature on this website for advertising, promotion, and other commercial purposes, according to the terms of BSI’s <Link href={'https://www.beamsuntory.com/index.php/en/privacy-policy'}>
              <a onClick={(e) => {
                e.preventDefault();
                setShowConsent(true);
              }}>
                Publicity Waiver & Release
              </a>
            </Link>.
          </span>
        </label>
      </div>
      <button className="btn_submit" onClick={saveImg}>
        <span className="text_submit">SUBMIT</span>
        <span className="btn_round" title="Submit">→</span>
      </button>
    </div>
  )
}

Signature.propTypes = {
  storeAction: PropTypes.object,
  setSignature: PropTypes.func,
  setShowConsent: PropTypes.func,
}

export default Signature
