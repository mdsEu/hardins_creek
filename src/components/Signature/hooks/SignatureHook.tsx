import {useRef} from 'react';

import {parseImgToFile} from '../../../utils/image'

function SignatureHook(store: any) {
  const signatureRef = useRef(null);

  const saveImg = () => {
    const siganture: any = signatureRef.current;

    const img = siganture.toDataURL("image/png");
    const contentType = 'image/png';
    siganture.clear();
    store.save(parseImgToFile(img, contentType))
  }

  return {
    signatureRef,
    saveImg
  };
}

export default SignatureHook
