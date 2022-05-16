import {useRef} from 'react'

function SignatureHook(store: any) {
  const signatureRef = useRef(null);

  const saveImg = () => {
    const siganture: any = signatureRef.current;

    const img = siganture.toDataURL("image/png");
    console.log(img)
    const contentType = 'image/png';
    const b64Data = img.replace('data:image/png;base64,','');
    siganture.clear();
    store.save(b64toBlob(b64Data, contentType))
  }

  const b64toBlob = (b64Data : string , contentType='', sliceSize=512) => {
    const byteCharacters = atob(b64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, {type: contentType});
    return blob;
  }

  return {
    signatureRef,
    saveImg
  };
}

export default SignatureHook
