import React, {useEffect, useState} from 'react';

//Components
import Image from '../components/Image';

// Store
import * as signatureStore from '../store/signatureStore';

function useSignatures() {
  const [signatures, setSignatures] = useState(Array<any>);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const timeParameter = setInterval(async () => {
      const images = await signatureStore.loadImages(page);
      const newSignatures = [...signatures, ...images.signatures as Array<any>];
      setSignatures(newSignatures);

      if (images.total !== 0) {
        setPage(page + 1);
      } else {
        clearInterval(timeParameter)
      }
    }, 1000);

    return () => {
      clearInterval(timeParameter)
    }
  }, [page]);


  const printImages = () : any => {
    const arraySignatures: any[] = [];
    let position = 0;

    for (let i = 0; i < signatures.length; i++) {
      const signature : any = signatures[i];
      const image = <Image className="signature" key={signature._id} alt={signature.id} src={signature.url} />;

      if(!arraySignatures[position]) {
        arraySignatures[position] = [image];
      } else {
        arraySignatures[position].push(image)
      }

      if (((i + 1) % 3) === 0) {
        position++;
      }
    }

    return signatures.map((signature : any) => <Image className="img-signature" key={signature._id} alt={signature.id} src={signature.url} />);
  }

  return {
    printImages
  }
}

export default useSignatures;
