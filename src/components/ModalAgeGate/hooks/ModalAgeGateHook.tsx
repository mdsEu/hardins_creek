import {useState, useEffect} from 'react'
import { useRouter } from 'next/router';
import moment from 'moment';

import {
  setLocalStorageByKey,
  getLocalStorageByKey,
} from '../../../helpers';

const regexOnlyNumbers = /^\d+$/;

function ModalAgeGateHook(open: boolean, actionsDocument: any) {
  const router = useRouter();
  const [messageError, setMessageError] = useState('');
  const [day, setDay] = useState(getLocalStorageByKey('age_gate__day'));
  const [month, setMonth] = useState(getLocalStorageByKey('age_gate__month'));
  const [year, setYear] = useState(getLocalStorageByKey('age_gate__year'));
  const [timerYearDay, setTimerYearDay] = useState<ReturnType<typeof setTimeout>>(setTimeout(() =>({}), 1000));


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
    setDay(dayNumber.toString());
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
    setMonth(monthNumber.toString());
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

    setYear(yearNumber.toString());
    clearTimeout(timerYearDay)
    const toutYear = setTimeout(() => {
      onChangeDay(day);
    }, 1500);

    setTimerYearDay(toutYear)

  };

  const onClickButtonSubmitAge = () => {
    const tempYear = isNaN(parseInt(year)) ? '' : parseInt(year);
    const tempMonth = isNaN(parseInt(month)) ? '' : parseInt(month);
    const tempDay = isNaN(parseInt(day)) ? '' : parseInt(day);

    if(!tempDay || !tempMonth || !tempYear) {
      setMessageError('Birth date invalid.');
      return;
    }

    const ageMoment = moment(`${tempYear}-${tempMonth}-${tempDay}`, 'YYYY-MM-DD');
    const isValidBirthDate = ageMoment.isValid();
    if(!isValidBirthDate) {
      setMessageError('Birth date invalid.');
      return;
    }

    if (ageMoment.add(21, 'years').valueOf() > new Date().getTime()) {
      setMessageError('The age should be greater than 21 years old.');
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

  return {
    day,
    onChangeDay,
    month,
    onChangeMonth,
    year,
    onChangeYear,
    onClickButtonSubmitAge,
    messageError,
  };
}

export default ModalAgeGateHook
