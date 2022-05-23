import {useRef} from 'react';

import {parseImgToFile} from '../../../utils/image'

const CONTENT_TYPE = 'image/png';

function SignatureHook(store: any) {
  const signatureRef = useRef(null);

  const saveImg = () => {
    const siganture: any = signatureRef.current;

    const img = siganture.toDataURL(CONTENT_TYPE);
    siganture.clear();

    store.save(parseImgToFile(img, CONTENT_TYPE))
  }

  return {
    signatureRef,
    saveImg
  };
}

export default SignatureHook
