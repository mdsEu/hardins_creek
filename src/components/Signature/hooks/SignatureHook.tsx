import {useRef, useState, useEffect} from 'react';

import {parseImgToFile} from '../../../utils/image'

const CONTENT_TYPE = 'image/png';

function SignatureHook(store: any, setSignature: any) {
  const signatureRef = useRef(null);
  const [signatureIsSending, setSignatureIsSending] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [acceptedConsent, setAcceptedConsent] = useState(false);
  const [isErrorTerms, setIsErrorTerms] = useState(false);
  const [isErrorConsent, setIsErrorConsent] = useState(false);
  const [alertSignatureEmpty, setAlertSignatureEmpty] = useState(false);

  useEffect(() => {
    if (signatureIsSending) {
      setSignatureIsSending(false);
      setSignature(true);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [signatureIsSending]);

  const saveImg = async () => {
    const signature: any = signatureRef.current;

    if(signature.isEmpty()) {
      setAlertSignatureEmpty(true);
      setTimeout(() => {
        setAlertSignatureEmpty(false);
      }, 3000);
    }

    if(!acceptedTerms) {
      setIsErrorTerms(true);
    }

    if(!acceptedConsent) {
      setIsErrorConsent(true);
    }

    if(signature.isEmpty() || !acceptedTerms || !acceptedConsent) return;

    const img = signature.toDataURL(CONTENT_TYPE);

    const response = await store.save(parseImgToFile(img, CONTENT_TYPE));
    // check response ahd update state modalSignature
    if(response._id) {
      signature.clear();
      setAcceptedTerms(false);
      setAcceptedConsent(false);
      setSignatureIsSending(true);
    }
  }

  const cleanPad = () => {
    const signature: any = signatureRef && signatureRef.current;

    signature.clear();

    setAlertSignatureEmpty(false);
  }

  const onChangeTerms = () => {
    if(isErrorTerms) {
      setIsErrorTerms(acceptedTerms);
    }
    setAcceptedTerms(!acceptedTerms);
  }

  const onChangeConsent = () => {
    if(isErrorConsent) {
      setIsErrorConsent(acceptedConsent);
    }
    setAcceptedConsent(!acceptedConsent);
  }

  return {
    acceptedTerms,
    acceptedConsent,
    setAcceptedTerms,
    isErrorTerms,
    isErrorConsent,
    signatureRef,
    saveImg,
    cleanPad,
    onChangeTerms,
    onChangeConsent,
    alertSignatureEmpty,
  };
}

export default SignatureHook
