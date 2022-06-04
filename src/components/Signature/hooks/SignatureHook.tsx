import {useRef,useState} from 'react';

import {parseImgToFile} from '../../../utils/image'

const CONTENT_TYPE = 'image/png';

function SignatureHook(store: any, setSignature: any) {
  const signatureRef = useRef(null);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [isErrorTerms, setIsErrorTerms] = useState(false);
  const [alertSignatureEmpty, setAlertSignatureEmpty] = useState(false);

  const saveImg = async () => {
    const signature: any = signatureRef.current;

    if(signature.isEmpty()) {
      setAlertSignatureEmpty(true);
      setTimeout(() => {
        setAlertSignatureEmpty(false);
      }, 3000);
    }
    
    if(!acceptedTerms) setIsErrorTerms(true);

    if(signature.isEmpty() || !acceptedTerms) return;

    const img = signature.toDataURL(CONTENT_TYPE);
    
    const response = await store.save(parseImgToFile(img, CONTENT_TYPE));
    // check response ahd update state modalSignature
    if(response._id) {
      setSignature(true);
    }

    signature.clear();
    setAcceptedTerms(false);
  }

  const cleanPad = () => {
    const signature: any = signatureRef && signatureRef.current;

    signature.clear();
    
    setAlertSignatureEmpty(false);

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
    alertSignatureEmpty,
  };
}

export default SignatureHook
