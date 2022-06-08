/* eslint-disable @next/next/no-img-element */
import type { NextPage } from 'next'
import { useRouter } from 'next/router';
import { useState, useEffect }  from 'react';
import Image from 'next/image';

import styles from '../styles/SignaturePage.module.scss'

import Signature from '../components/Signature';
import { SignUpModal, SignatureModal } from '@/components/modal';
import { IModal } from '../customTypes';

import imageStore from '../store/imageStore';
import HcBody from '../components/HcBody';

import { asset, URLS } from '../helpers';
import {handleToggleDisplay} from '@/utils/optanonFunction';

import drinkSmart from '@/public/images/modal-age-gate/drink_smart.svg';;
import documentStore from '../store/documentStore';

const modalSignUp: IModal = {
  title: null,
  message: "Sign up for updates from JBBDCo.\n\rand Hardin's Creek.",
  width: 350,
};

const modalSignature: IModal = {
  title: 'You signature has been recorded.',
  message: 'Look for the symbol on the Hardin`s Creek website soon to see it etched into history.',
  width: 500,
};

const SignaturePage: NextPage = () => {
  const router = useRouter();
  const [imgState, imgAction] = imageStore();
  const [noThanks, setNoThanks] = useState(false);
  const [signatureRecord, setSignatureRecord] = useState(false);
  const [goAgeGate, setGoAgeGate] = useState(false);
  const [documentStates] = documentStore();

  useEffect(() => {
    if (documentStates.previousPage !== 'home') {
      router.push('/');
    }

    setTimeout(() => {
      setNoThanks(true);
    },1000);
  }, []);

  useEffect(() => {
    if(goAgeGate) {
      router.push('/');
    }
  }, [goAgeGate, router]);

  return (
    <HcBody>
      <div className={styles.signature_page}>
        <div style={{height: "12px"}}></div>
        <div className={styles.wrap_content}>
          <img alt="Hardin's Creek" src={asset('images/modal-age-gate/logo.png')} />
          <h3>LEAVE YOUR MARK ON THE BEAM LEGACY</h3>
          <p>Your signature will be displayed as one of the few who have tasted Hardin’s Creek.</p>
          <Signature storeAction={imgAction} setSignature={setSignatureRecord} />
        </div>
        <div className={styles.wrap_foot}>
            <a className={styles.link_logo} href={URLS.drink} target="_blank" rel="noreferrer">
            <Image
              src={drinkSmart}
              alt="Drink Smart"
              width={111}
              height={27}
            />
            </a>
            <p className={styles.text_terms}>BEAM SUNTORY INC. – MERCHANDISE MART, 222 W. MERCHANDISE MART PLAZA SUITE 1600, CHICAGO, IL 60654. - ©2022 JAMES B. BEAM DISTILLING CO., CLERMONT, KY. – HARDIN’S CREEK™ KENTUCKY STRAIGHT BOURBON WHISKEY, 54% ALC./VOL.<br />
              <a href={URLS.contact} target="_blank" rel="noreferrer">CONTACT US</a>&nbsp;-&nbsp;
              <a href={URLS.privacity} target="_blank" rel="noreferrer">PRIVACY POLICY</a>&nbsp;-&nbsp;
              <a href={URLS.cookies} target="_blank" rel="noreferrer">COOKIE POLICY</a>&nbsp;-&nbsp;
              <a href={URLS.terms} target="_blank" rel="noreferrer">TERMS AND CONDITIONS</a>&nbsp;-&nbsp;
              <a href={URLS.marketing} target="_blank" rel="noreferrer">MARKETING CODE</a>&nbsp;-&nbsp;
              <a href={URLS.transparency} target="_blank" rel="noreferrer">SUPPLY CHAIN TRANSPARENCY</a>&nbsp;-&nbsp;
              <a href="#" onClick={handleToggleDisplay}>DO NOT SELL MY INFORMATION</a>
            </p>
        </div>
      </div>

      {signatureRecord && <SignatureModal modal={modalSignature} setSignature={setSignatureRecord} setGoAgeGate={setGoAgeGate} />}
      {noThanks && <SignUpModal modal={modalSignUp} noThanks={setNoThanks} />}
    </HcBody>
  )
}

export default SignaturePage
