import {useRef, useState, useEffect} from 'react'
import moment from 'moment';

import {
  setLocalStorageByKey,
  getLocalStorageByKey,
} from '../../../helpers';

const regexOnlyNumbers = /^\d+$/;

function ModalAgeGateHook(open: boolean, actionsDocument: any) {
  const signatureRef = useRef(null);

  const [messageError, setMessageError] = useState('');
  const [day, setDay] = useState(getLocalStorageByKey('age_gate__day'));
  const [month, setMonth] = useState(getLocalStorageByKey('age_gate__month'));
  const [year, setYear] = useState(getLocalStorageByKey('age_gate__year'));
  const [rememberMe, setRememberMe] = useState(false);
  const [timerYearDay, setTimerYearDay] = useState(0);


  const onChangeDay = (val: any) => {
    let dayNumber = parseInt(val);
    if(isNaN(dayNumber) || dayNumber <= 0 || !regexOnlyNumbers.test(val)) {
      setDay('');
      return;
    }
    const tempYear = isNaN(parseInt(year)) ? 2000 : parseInt(year);
    const tempMonth = isNaN(parseInt(month)) ? 1 : parseInt(month);
    const isValidBirthDate = moment(`${tempYear}-${tempMonth}-${dayNumber}`, 'YYYY-MM-DD').isValid();
    if(!isValidBirthDate) {
      setDay('');
      return;
    }
    setMessageError('');
    setDay(dayNumber);
  };

  const onChangeMonth = (val: any) => {
    let monthNumber = parseInt(val);
    if(isNaN(monthNumber) || monthNumber <= 0 || !regexOnlyNumbers.test(val)) {
      setMonth('');
      return;
    }
    if(monthNumber > 12) {
      setMonth('');
      return;
    }
    setMonth(monthNumber);
    onChangeDay(day);
  };

  const onChangeYear = (val: any) => {
    let yearNumber = parseInt(val);
    if(isNaN(yearNumber) || yearNumber <= 0 || !regexOnlyNumbers.test(val)) {
      setYear('');
      return;
    }

    const currentYear = parseInt(moment().format('YYYY'));
    if(yearNumber > currentYear) {
      yearNumber = currentYear;
    }

    setYear(yearNumber);
    clearTimeout(timerYearDay)
    const toutYear = setTimeout(() => {
      onChangeDay(day);
    }, 1500);
    setTimerYearDay(toutYear)

  };

  const onChangeRememberMe = () => {
    setRememberMe(!rememberMe);
  };

  const onClickButtonSubmitAge = () => {
    const tempYear = isNaN(parseInt(year)) ? '' : parseInt(year);
    const tempMonth = isNaN(parseInt(month)) ? '' : parseInt(month);
    const tempDay = isNaN(parseInt(day)) ? '' : parseInt(day);

    if(!tempDay || !tempMonth || !tempYear) {
      setMessageError('Birthdate invalid.');
      return;
    }

    const ageMoment = moment(`${tempYear}-${tempMonth}-${tempDay}`, 'YYYY-MM-DD');
    const isValidBirthDate = ageMoment.isValid();
    if(!isValidBirthDate) {
      setMessageError('Birthdate invalid.');
      return;
    }

    if(rememberMe) {
      setLocalStorageByKey('age_gate__day', day);
      setLocalStorageByKey('age_gate__month', month);
      setLocalStorageByKey('age_gate__year', year);
    }
    /**
     * ToDO:
     * Submit button action here
     */
  };



  useEffect(() => {
    if(open) {
      actionsDocument.addBodyClass('overflow_hidden');
    } else {
      actionsDocument.removeBodyClass('overflow_hidden');
    }
  }, [open]);

  return {
    day,
    onChangeDay,
    month,
    onChangeMonth,
    year,
    onChangeYear,
    rememberMe,
    onChangeRememberMe,
    onClickButtonSubmitAge,
    messageError,
  };
}

export default ModalAgeGateHook
