/* eslint-disable @next/next/no-img-element */
import type { NextPage } from 'next'


import styles from '../styles/SignaturePage.module.scss'

import Signature from '../components/Signature';

import imageStore from '../store/imageStore';
import HcBody from '../components/HcBody';

import { asset } from '../helpers';

const SignaturePage: NextPage = () => {
  const [imgState, imgAction] = imageStore();

  return (
    <HcBody>
      <div className={styles.signature_page}>
        <div className={styles.background_opacity}></div>
        <div className={styles.wrap_content}>
          <img alt="Hardin's Creek" src={asset('images/modal-age-gate/logo.png')} />
          <h3>LEAVE YOUR MARK ON THE BEAM LEGACY</h3>
          <p>Your signature will be displayed among the first to taste Hardin´s Creek.</p>
          <Signature storeAction={ imgAction }/>
        </div>
      </div>
    </HcBody>
  )
}

export default SignaturePage
