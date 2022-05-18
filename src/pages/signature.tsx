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
        <div className={styles.wrap_content}>
          <img alt="Hardin's Creek" src={asset('images/modal-age-gate/logo.png')} />
          <h3>LEAVE YOUR MARK ON THE BEAM LEGACY</h3>
          <p>Your signature will be displayed among the first to taste Hardin´s Creek</p>
          <form action="">
            <Signature storeAction={ imgAction }/>
            <div className={styles.wrap_accept_terms}>
              <label>
                <input type="checkbox" name="" id="" />
                <span className={styles.icon_check}></span>
                I agree to let Hardin´s Creek display my signature on their website.
              </label>
            </div>
            <button type="submit">SUBMIT</button>
          </form>
        </div>
      </div>
    </HcBody>
  )
}

export default SignaturePage
