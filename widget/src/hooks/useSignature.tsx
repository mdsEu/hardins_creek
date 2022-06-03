import React, {useEffect, useState} from 'react';

//Components
import Image from '../components/Image';

// Store
import * as signatureStore from '../store/signatureStore';

function useSignatures() {
  const [signatures, setSignatures] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {

    const loadImages = async () => {
      const images = await signatureStore.loadImages(page);
      setSignatures(images.signatures);

      /*if (images.total && images.total === 10) {
        setPage(images.page);
      }*/

    }

    loadImages();
  }, []);


  const printImages = () : any => {
    const arraySignatures: any[] = [];
    let position = 0;

    for (let i = 0; i < signatures.length; i++) {
      const signature : any = signatures[i];
      const image = <Image key={signature._id} alt={signature.id} src={signature.url} />;

      if(!arraySignatures[position]) {
        arraySignatures[position] = [image];
      } else {
        arraySignatures[position].push(image)
      }

      if (((i + 1) % 3) === 0) {
        position++;
      }
    }

    return signatures.map((signature : any) => <Image key={signature._id} alt={signature.id} src={signature.url} />);
  }

  return {
    printImages
  }
}

export default useSignatures;
