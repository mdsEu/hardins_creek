import {useRef,useState} from 'react';

import {parseImgToFile} from '../../../utils/image'

const CONTENT_TYPE = 'image/png';

function SignatureHook(store: any) {
  const signatureRef = useRef(null);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [isErrorTerms, setIsErrorTerms] = useState(false);

  const saveImg = () => {
    const signature: any = signatureRef.current;

    if(!acceptedTerms) {
      setIsErrorTerms(true);
      return;
    }

    const img = signature.toDataURL(CONTENT_TYPE);
    signature.clear();

    store.save(parseImgToFile(img, CONTENT_TYPE))

    setAcceptedTerms(false);
  }

  const cleanPad = () => {
    const signature: any = signatureRef && signatureRef.current;

    signature.clear();

    setAcceptedTerms(false);
  }

  const onChangeTerms = () => {
    if(isErrorTerms) {
      setIsErrorTerms(acceptedTerms);
    }
    setAcceptedTerms(!acceptedTerms);
  }

  return {
    acceptedTerms,
    setAcceptedTerms,
    isErrorTerms,
    signatureRef,
    saveImg,
    cleanPad,
    onChangeTerms,
  };
}

export default SignatureHook
