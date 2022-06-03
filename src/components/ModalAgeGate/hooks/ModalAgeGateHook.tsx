import {useState, useEffect} from 'react'
import { useRouter } from 'next/router';
import moment from 'moment';

import {
  setLocalStorageByKey,
  getLocalStorageByKey,
} from '../../../helpers';

function ModalAgeGateHook(open: boolean, actionsDocument: any, setAgeError: any) {
  const router = useRouter();
  const [messageError, setMessageError] = useState('');
  const [day, setDay] = useState(getLocalStorageByKey('age_gate__day'));
  const [month, setMonth] = useState(getLocalStorageByKey('age_gate__month'));
  const [year, setYear] = useState(getLocalStorageByKey('age_gate__year'));
  const [timerYearDay, setTimerYearDay] = useState<ReturnType<typeof setTimeout>>(setTimeout(() =>({}), 1000));

  const onExitInput = (event: any) => {
    const { name, value } = event.target;
    const newValue = String(value).padStart(2, '0');

    name === 'day' ? setDay(newValue) : setMonth(newValue);
  };

  const checkOnlyNumbers = (event: any) => {
    const keyCode = event.keyCode || event.which;
    if (keyCode === 16 || keyCode > 31 && (keyCode < 48 || keyCode > 57)) {
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

  const handleChangeDay = (value: any) => {
    const tempYear  = isNaN(parseInt(year)) ? 2000 : parseInt(year);
    const tempMonth = isNaN(parseInt(month)) ? 1 : parseInt(month);
    const tempDay   = parseInt(value);

    const isValidBirthDate = moment(`${tempYear}-${tempMonth}-${tempDay}`, 'YYYY-MM-DD').isValid();
    console.log('isValidBirthDate', isValidBirthDate);

    if(!isValidBirthDate) {
      setDay('');
      return;
    }

    setDay(value);
  };

  const onChangeDayMonth = (event: any) => {
    const { name, value } = event.target;
    if (value.length > 2) return;

    if(name === 'month') {
      if(parseInt(value) > 12) {
        return;
      }
      setMonth(value);
      handleChangeDay(day);
      return;
    }
    
    handleChangeDay(value);
  };

  const onChangeYear = (event: any) => {
    const { value } = event.target;
    if (value.length > 4) return;

    let yearNumber = parseInt(value);

    const currentYear = parseInt(moment().format('YYYY'));
    if(yearNumber > currentYear) {
      yearNumber = currentYear;
    }

    setYear(yearNumber.toString());
    clearTimeout(timerYearDay);
    const toutYear = setTimeout(() => {
      handleChangeDay(day);
    }, 800);

    setTimerYearDay(toutYear);
  };

  const onClickButtonSubmitAge = () => {
    setMessageError('');
    const tempYear = isNaN(parseInt(year)) ? '' : parseInt(year);
    const tempMonth = isNaN(parseInt(month)) ? '' : parseInt(month);
    const tempDay = isNaN(parseInt(day)) ? '' : parseInt(day);

    if(!tempDay || !tempMonth || !tempYear) {
      setMessageError('Invalid date');
      return;
    }

    const ageMoment = moment(`${tempYear}-${tempMonth}-${tempDay}`, 'YYYY-MM-DD');
    const isValidBirthDate = ageMoment.isValid();
    if(!isValidBirthDate) {
      setMessageError('Invalid date');
      return;
    }

    if (ageMoment.add(21, 'years').valueOf() > new Date().getTime()) {
      // call iframe
      setAgeError(true);
      //setMessageError('You must be over 21 to participate');
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
    month,
    year,
    onChangeDayMonth,
    onChangeYear,
    onClickButtonSubmitAge,
    messageError,
    onExitInput,
    checkOnlyNumbers,
  };
}

export default ModalAgeGateHook
