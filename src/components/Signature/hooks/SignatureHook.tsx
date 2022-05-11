import {useRef} from 'react'

function SignatureHook(store: any) {
  const signatureRef = useRef(null);

  const saveImg = () => {
    const siganture: any = signatureRef.current;

    const img = siganture.toDataURL("image/png");
    siganture.clear();
    store.save(img)
  }

  return {
    signatureRef,
    saveImg
  };
}

export default SignatureHook
