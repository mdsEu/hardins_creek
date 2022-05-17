export function b64toBlob (b64Data : string , contentType='', sliceSize=512): Blob {
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

export function dataUrlToBob(img: string, dataImage: string, contentType: string): Blob {
  const b64Data = img.replace(dataImage,'');

  return b64toBlob(b64Data, contentType);
}

export function getImageFromFile(blobImage: any, name: string, contentType: string) : File {
  return new File([blobImage], name, {
    type: contentType
  });
}

export function parseImgToFile(img: string, contentType: string) : File {
  const name = `${Date.now().toString()}.${getType(contentType)}`;

  const blobImage = dataUrlToBob(img, `data:${contentType};base64,`, contentType)

  return getImageFromFile(blobImage, name, contentType);
}

export function getType(contentType:string): string {
  const type = contentType.split('/').pop() || '';
  return type;
}
