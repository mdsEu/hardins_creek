/* eslint-disable @next/next/no-img-element */
import React from 'react';
import Image from 'next/image'
import PropTypes from 'prop-types';

import styles from './ModalAgeGate.module.scss';

import useModalAgeGateHook from "./hooks/ModalAgeGateHook";

import {asset} from '../../helpers';

import logo from '../../../public/images/modal-age-gate/logo_hardinscreek.png';

function ModalAgeGate(props: any) {
  const {
    day,
    onChangeDay,
    month,
    onChangeMonth,
    year,
    onChangeYear,
    onClickButtonSubmitAge,
    messageError,
  } = useModalAgeGateHook(props.open, props.storeAction)

  if(!props.open) {
    return <></>;
  }

  return (
    <>
      {props.withBackground && <div className={styles.background} onClick={props.closeWithBackground ? props.onClose : null}></div>}
      <div className={styles.panel}>
        <div className={styles.padder}>
          <div className={styles.wrap_logo}>
            <Image
              src={logo}
              alt="Hardin's Creek"
              width={180}
              height={41.7}
            />
          </div>

          <h4>
            <div>
              <span className={styles.title__secondary}>A </span>
              <span className={styles.title__primary}>227 Year Legacy </span>
              <span className={styles.title__secondary}> has a</span>
            </div>
            <div>
              <span className={styles.title__secondary}>21 year age requirement.</span>
            </div>
          </h4>
          <label>ENTER YOUR BIRTH DATE</label>
          {messageError && <p className="text_error">{messageError}</p>}
          <div className={styles.container_input}>

            <div className={styles.wrap_inputs}>
              <div className={styles.wrap_input}>
                <div className={styles.dots}>
                  <input type="number" name="month" placeholder="MONTH" onChange={(e) => onChangeMonth(e.target.value)} value={month} />
                  <svg width="182" height="1" viewBox="0 0 182 1" fill="none"><line x1="0.268066" y1="0.377425" x2="181.786" y2="0.377425" stroke="#DBCAAF" strokeWidth="0.587069" strokeDasharray="6.46 6.46"/></svg>
                </div>
              </div>
              <div className={styles.wrap_input}>
                <div className={styles.dots}>
                  <input type="number" name="day" placeholder="DAY" onChange={(e) => onChangeDay(e.target.value)} value={day} />
                  <svg width="182" height="1" viewBox="0 0 182 1" fill="none"><line x1="0.268066" y1="0.377425" x2="181.786" y2="0.377425" stroke="#DBCAAF" strokeWidth="0.587069" strokeDasharray="6.46 6.46"/></svg>
                </div>
              </div>
              <div className={styles.wrap_input}>
                <div className={styles.dots}>
                  <input type="number" name="year" placeholder="YEAR" onChange={(e) => onChangeYear(e.target.value)} value={year} />
                  <svg width="182" height="1" viewBox="0 0 182 1" fill="none"><line x1="0.268066" y1="0.377425" x2="181.786" y2="0.377425" stroke="#DBCAAF" strokeWidth="0.587069" strokeDasharray="6.46 6.46"/></svg>
                </div>
              </div>
            </div>

            <button onClick={onClickButtonSubmitAge}>BE PART OF THE LEGACY <svg width="20" height="20" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="15.8104" cy="15.8427" r="15.7772" fill="#0B1319"/><path d="M19.918 17.4494L20.5829 16.7844H19.6426H9.63852V15.3708H19.6426H20.5829L19.918 14.7059L17.4919 12.2798L18.4915 11.2802L23.2889 16.0776L18.4915 20.875L17.4919 19.8755L19.918 17.4494Z" fill="#DBCAAF" stroke="#0B1319" strokeWidth="0.778996"/></svg></button>
          </div>
          <div className={styles.wrap_logo_foot}>
            <img alt="drink smart" src={asset('images/modal-age-gate/drink_smart.png')} />
            <p className={styles.text_terms}>BY ENTERING, YOU AGREE TO OUR <a href="#terms" target="_blank">TERMS AND CONDITIONS & PRIVACY POLICY</a>.</p>
          </div>
        </div>
      </div>
    </>
  )
}
ModalAgeGate.defaultProps = {
  open: false,
  withBackground: true,
  closeWithBackground: true,
}
ModalAgeGate.propTypes = {
  storeAction: PropTypes.object,
  open: PropTypes.bool.isRequired,
  withBackground: PropTypes.bool.isRequired,
  closeWithBackground: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
}

export default ModalAgeGate;
