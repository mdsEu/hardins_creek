/* eslint-disable @next/next/no-img-element */
/*global google*/
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image'
import PropTypes from 'prop-types';
import TagManager from 'react-gtm-module';

import styles from './ModalAgeGate.module.scss';

import useModalAgeGateHook from "./hooks/ModalAgeGateHook";

import { URLS } from '../../helpers';

import logo from '@/public/images/modal-age-gate/logo_hardinscreek.png';
import drinkSmart from '@/public/images/modal-age-gate/drink_smart.svg';

function ModalAgeGate(props: any) {
  const { open, storeAction, setAgeError } = props;
  const {
    day,
    month,
    year,
    onChangeDayMonth,
    onChangeYear,
    onClickButtonSubmitAge,
    messageError,
    onExitInput,
    checkOnlyNumbers,
    focus,
  } = useModalAgeGateHook(open, storeAction, setAgeError)
  
  const [inputList, setInputList] = useState([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const input = inputRef.current;
  } , [focus]);

  if(!props.open) {
    return <></>;
  }

  const handleToggleDisplay = () => {
    // const tagManagerArgs = {
    //   gtmId: 'GTM-P3XTKBJ',
    //   events: {
    //       event: `Optanon.ToggleInfoDisplay()`,
    //   }
    // };
    // TagManager.initialize(tagManagerArgs);

    if (typeof window !== 'undefined' && typeof window.Optanon !== 'undefined') {
        Optanon.ToggleInfoDisplay();
    }
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

          <h4 className={messageError && styles.error}>
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
                  <input
                    type="number"
                    name="month"
                    id="0"
                    placeholder="MONTH"
                    onKeyDown={checkOnlyNumbers}
                    onChange={onChangeDayMonth}
                    onBlur={onExitInput}
                    value={month}
                    maxLength={2}
                    ref={inputRef}
                  />
                  <svg width="182" height="1" viewBox="0 0 182 1" fill="none"><line x1="0.268066" y1="0.377425" x2="181.786" y2="0.377425" stroke="#DBCAAF" strokeWidth="0.587069" strokeDasharray="6.46 6.46"/></svg>
                </div>
              </div>
              <div className={styles.wrap_input}>
                <div className={styles.dots}>
                  <input
                    type="number"
                    name="day"
                    id="1"
                    placeholder="DAY"
                    onKeyDown={checkOnlyNumbers}
                    onChange={onChangeDayMonth}
                    onBlur={onExitInput}
                    value={day}
                    maxLength={2}
                    ref={inputRef}
                    />
                  <svg width="182" height="1" viewBox="0 0 182 1" fill="none"><line x1="0.268066" y1="0.377425" x2="181.786" y2="0.377425" stroke="#DBCAAF" strokeWidth="0.587069" strokeDasharray="6.46 6.46"/></svg>
                </div>
              </div>
              <div className={styles.wrap_input}>
                <div className={styles.dots}>
                  <input 
                    type="number"
                    name="year"
                    id="2"
                    placeholder="YEAR"
                    onKeyDown={checkOnlyNumbers}
                    onChange={onChangeYear}
                    value={year}
                    maxLength={4}
                    ref={inputRef}
                  />
                  <svg width="182" height="1" viewBox="0 0 182 1" fill="none"><line x1="0.268066" y1="0.377425" x2="181.786" y2="0.377425" stroke="#DBCAAF" strokeWidth="0.587069" strokeDasharray="6.46 6.46"/></svg>
                </div>
              </div>
            </div>

            <button onClick={onClickButtonSubmitAge}>BE PART OF THE LEGACY <svg width="20" height="20" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="15.8104" cy="15.8427" r="15.7772" fill="#0B1319"/><path d="M19.918 17.4494L20.5829 16.7844H19.6426H9.63852V15.3708H19.6426H20.5829L19.918 14.7059L17.4919 12.2798L18.4915 11.2802L23.2889 16.0776L18.4915 20.875L17.4919 19.8755L19.918 17.4494Z" fill="#DBCAAF" stroke="#0B1319" strokeWidth="0.778996"/></svg></button>
          </div>
          <div className={styles.wrap_logo_foot}>
            <a className={styles.link_logo} href={URLS.drink} target="_blank" rel="noreferrer">
            <Image
              src={drinkSmart}
              alt="Drink Smart"
              width={111}
              height={27}
            />
            </a>
            <p className={styles.text_terms}>BY ENTERING, YOU AGREE TO OUR&nbsp;
              <a href={URLS.terms} target="_blank" rel="noreferrer">TERMS AND CONDITIONS</a>,&nbsp;
              <a href={URLS.privacity} target="_blank" rel="noreferrer">PRIVACY POLICY</a> &&nbsp;
              <a href={URLS.cookies} target="_blank" rel="noreferrer">COOKIE POLICY</a>&nbsp;
              <br />
              <a href="javascript:void(0);" onClick={handleToggleDisplay}>DO NOT SELL MY INFORMATION</a>
              </p>
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
  setAgeError: PropTypes.func.isRequired,
}

export default ModalAgeGate;
