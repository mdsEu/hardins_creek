/* eslint-disable @next/next/no-img-element */
import type { NextPage } from 'next'
import { useRouter } from 'next/router';
import { useState, useEffect }  from 'react';
import Image from 'next/image';
import { useMediaQuery } from 'react-responsive'

import styles from '../styles/SignaturePage.module.scss'

import Signature from '../components/Signature';
import { SignUpModal, SignatureModal, PublicityWaiverModal } from '@/components/modal';
import { IModal } from '../customTypes';

import imageStore from '../store/imageStore';
import HcBody from '../components/HcBody';

import { asset, URLS } from '../helpers';
import {handleToggleDisplay} from '@/utils/optanonFunction';

import logo from '@/public/images/modal-age-gate/logo_hardinscreek.png';
import drinkSmart from '@/public/images/modal-age-gate/drink_smart.svg';;
import documentStore from '../store/documentStore';

const modalSignUp: IModal = {
  title: null,
  message: "Sign up for updates from JBBDCo.\n\rand Hardin's Creek.",
  width: 350,
};

const modalSignature: IModal = {
  title: 'Your signature has been recorded.',
  message: 'Look for the symbol on the Hardin`s Creek website soon to see it etched into history.',
  width: 350,
};

const modalConcent: IModal = {
  title: 'Publicity Waiver and Release:',
  message: '',
  width: 350,
};

const SignaturePage: NextPage = () => {
  const router = useRouter();
  const isDesktop = useMediaQuery({ minWidth: 768 });
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const [imgState, imgAction] = imageStore();
  const [noThanks, setNoThanks] = useState(false);
  const [signatureRecord, setSignatureRecord] = useState(false);
  const [goAgeGate, setGoAgeGate] = useState(false);
  const [showConsent, setShowConsent] = useState(false);
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
      <div className={styles.signature_page_wrap}>
        <div className={styles.signature_page}>
          <div className={styles.wrap_content}>
            <div className={styles.wrap_logo}>
              <Image
                src={logo}
                alt="Hardin's Creek"
                layout='fill'
                objectFit='contain'
              />
            </div>
            <h3>LEAVE YOUR MARK ON THE BEAM LEGACY</h3>
            <p>Your signature will be displayed as one of the few who have tasted Hardin’s Creek.</p>
            <Signature storeAction={imgAction} setSignature={setSignatureRecord} setShowConsent={setShowConsent} />
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
              <p className={styles.text_terms}>BEAM SUNTORY INC. – MERCHANDISE MART, 222 W. MERCHANDISE MART PLAZA SUITE 1600, CHICAGO, IL 60654. - ©2022 JAMES B. BEAM DISTILLING CO., CLERMONT, KY. - HARDIN’S CREEK™ KENTUCKY STRAIGHT BOURBON WHISKEY, 54% ALC./VOL.<br />
                <a href={URLS.contact} target="_blank" rel="noreferrer">CONTACT US</a>&nbsp;-&nbsp;
                <a href={URLS.privacity} target="_blank" rel="noreferrer">PRIVACY POLICY</a>&nbsp;-&nbsp;
                <a href={URLS.cookies} target="_blank" rel="noreferrer">COOKIE POLICY</a>&nbsp;-&nbsp;
                <a href={URLS.terms} target="_blank" rel="noreferrer">TERMS AND CONDITIONS</a>&nbsp;-&nbsp;
                <a href={URLS.marketing} target="_blank" rel="noreferrer">MARKETING CODE</a>&nbsp;-&nbsp;
                <a href={URLS.transparency} target="_blank" rel="noreferrer">SUPPLY CHAIN TRANSPARENCY</a>&nbsp;
                {isMobile ? <br /> : <>-&nbsp;</>}
                <a href="#" onClick={handleToggleDisplay}>DO NOT SELL MY INFORMATION</a>
              </p>
          </div>
        </div>
      </div>

      {signatureRecord && <SignatureModal modal={modalSignature} setSignature={setSignatureRecord} setGoAgeGate={setGoAgeGate} />}
      {noThanks && <SignUpModal modal={modalSignUp} noThanks={setNoThanks} />}
      {showConsent && <PublicityWaiverModal modal={modalConcent} setShowConsent={setShowConsent} />}

    </HcBody>
  )
}

export default SignaturePage
