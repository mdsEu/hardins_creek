import {useRef,useState} from 'react';

import {parseImgToFile} from '../../../utils/image'

function SignatureHook(store: any) {
  const signatureRef = useRef(null);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [isErrorTerms, setIsErrorTerms] = useState(false);

  const saveImg = () => {
    const siganture: any = signatureRef.current;

    if(!acceptedTerms) {
      setIsErrorTerms(true);
      return;
    }

    const img = siganture.toDataURL("image/png");
    const contentType = 'image/png';
    siganture.clear();
    store.save(parseImgToFile(img, contentType))
  }

  const cleanPad = () => signatureRef && signatureRef.current && signatureRef.current.clear()

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
