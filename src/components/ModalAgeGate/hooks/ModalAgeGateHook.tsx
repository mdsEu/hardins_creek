import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import moment from 'moment';
import TagManager from 'react-gtm-module';

import {
  getLocalStorageByKey,
} from '../../../helpers';

const ERROR_MESSAGE = 'Please enter your date of birth correctly: MM - DD - YYYY';

function ModalAgeGateHook(open: boolean, actionsDocument: any) {
  const router = useRouter();
  const [messageError, setMessageError] = useState('');
  const [day, setDay] = useState(getLocalStorageByKey('age_gate__day'));
  const [month, setMonth] = useState(getLocalStorageByKey('age_gate__month'));
  const [year, setYear] = useState(getLocalStorageByKey('age_gate__year'));
  const [focus, setFocus] = useState(0);

  const inputDayRef = useRef<HTMLInputElement>(null);
  const inputMonthRef = useRef<HTMLInputElement>(null);
  const inputYearRef = useRef<HTMLInputElement>(null);

  const onExitInput = (event: any) => {
    const { name, value } = event.target;

    if(value === '') return;

    const newValue = String(value).padStart(2, '0');

    name === 'day' ? setDay(newValue) : setMonth(newValue);
  };

  const checkOnlyNumbers = (event: any) => {
    const keyCode = event.keyCode || event.which;
    const value = event.target.value;
    const regExpNumbers = /^\d+$/;
    const hasOnlyNumbers = regExpNumbers.test(value);

    if (keyCode === 13) {
      onClickButtonSubmitAge();
      event.preventDefault();
    }

    if (!hasOnlyNumbers) {
      event.preventDefault();
      return false;
    }

    const exceptSymbols = ['e','E','+','-','.',','];

    if (exceptSymbols.includes(event.key)) {
      event.preventDefault();
      return false
    };

    return true;
  };

  const checkValidateDate = ({year = '2022', month='01', day='01'}) => {
    return moment(`${year}-${month}-${day}`, 'YYYY-MM-DD').isValid();
  }

  const onChangeDay = (event: any) => {
    const { value, maxLength } = event.target;

    if (value.length > maxLength) return;

    if (value == '00') {
      return;
    }

    const isValidBirthDate = checkValidateDate({
      day: value,
      month: month || '01',
      year: year || '2000'
    });


    console.log(isValidBirthDate)
    if(!isValidBirthDate && (value !== '0')) {
      return;
    }

    setDay(value);

    if(parseInt(value) > 3 || value === '01' || value === '02' || value === '03') {
      setFocus(2);
    }

    return;
  };

  const onChangeMonth = (event: any) => {
    const { value, maxLength } = event.target;

    if (value.length > maxLength) return;

    if(parseInt(value) > 12) {
      return;
    }

    if (value == '00') {
      return;
    }

    setMonth(value);

    if (parseInt(value) > 1 || value === '01') {
      setFocus(1);
    }

    return;
  };

  const onChangeYear = (event: any) => {
    const { value } = event.target;
    if (value.length > 4) return;

    let yearNumber = parseInt(value);

    const currentYear = parseInt(moment().format('YYYY'));

    if(yearNumber > currentYear) {
      yearNumber = currentYear;
    }

    const isValidBirthDate = checkValidateDate({
      day: value,
      month: month || '01',
      year: year || '2000'
    });

    if(!isValidBirthDate && value.length === 4) {
      return;
    }

    setYear(yearNumber.toString());
  };

  const onClickButtonSubmitAge = () => {
    setMessageError('');
    const tempYear = isNaN(parseInt(year)) ? '' : parseInt(year);
    const tempMonth = isNaN(parseInt(month)) ? '' : parseInt(month);
    const tempDay = isNaN(parseInt(day)) ? '' : parseInt(day);

    if(!tempDay || !tempMonth || !tempYear) {
      setMessageError(ERROR_MESSAGE);
      return;
    }

    const ageMoment = moment(`${tempYear}-${tempMonth}-${tempDay}`, 'YYYY-MM-DD');
    const isValidBirthDate = ageMoment.isValid();
    if(!isValidBirthDate) {
      setMessageError(ERROR_MESSAGE);
      return;
    }

    // age gate GTM
    const tagManagerArgs = {
      dataLayer: {
        event: 'e_ageGate',
        ageGatePass: isValidBirthDate,
        ageGateAge: `${moment().diff(ageMoment, 'years')}`,
        ageGateYear: `${parseInt(year)}`,
      }
    };

    TagManager.dataLayer(tagManagerArgs);

    if (ageMoment.add(21, 'years').valueOf() > new Date().getTime()) {
      router.push('https://www.responsibility.org/');
      return;
    }

    if (isValidBirthDate) {
      router.push('/signature');
    }
  };

  useEffect(() => {
    if(open) {
      actionsDocument.addBodyClass('overflow_hidden');
    } else {
      actionsDocument.removeBodyClass('overflow_hidden');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  useEffect(() => {
    if (focus === 0) {
      inputMonthRef.current?.focus();
    }

    if (focus === 1) {
      inputDayRef.current?.focus();
    }

    if (focus === 2) {
      inputYearRef.current?.focus();
    }
  } , [focus]);


  return {
    day,
    month,
    year,
    onChangeDay,
    onChangeMonth,
    onChangeYear,
    onClickButtonSubmitAge,
    messageError,
    onExitInput,
    checkOnlyNumbers,
    setFocus,
    focus,
    inputDayRef,
    inputMonthRef,
    inputYearRef
  };
}

export default ModalAgeGateHook
