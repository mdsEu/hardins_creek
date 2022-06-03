/* eslint-disable @next/next/no-img-element */
import type { NextPage } from 'next'
import { useRouter } from 'next/router';
import { useState, useEffect }  from 'react';

import styles from '../styles/SignaturePage.module.scss'

import Signature from '../components/Signature';
import { SignUpModal, SignatureModal } from '@/components/modal';
import { IModal } from '@/types/index';

import imageStore from '../store/imageStore';
import HcBody from '../components/HcBody';

import { asset } from '../helpers';

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

  useEffect(() => {
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
        <div className={styles.background_opacity}></div>
        <div className={styles.wrap_content}>
          <img alt="Hardin's Creek" src={asset('images/modal-age-gate/logo.png')} />
          <h3>LEAVE YOUR MARK ON THE BEAM LEGACY</h3>
          <p>Your signature will be displayed as one of the first who have tasted Hardin´s Creek.</p>
          <Signature storeAction={imgAction} setSignature={setSignatureRecord} />
        </div>
      </div>

      {signatureRecord && <SignatureModal modal={modalSignature} setSignature={setSignatureRecord} setGoAgeGate={setGoAgeGate} />}
      {noThanks && <SignUpModal modal={modalSignUp} noThanks={setNoThanks} />}
    </HcBody>
  )
}

export default SignaturePage
