import gm from 'gm';

export function getType(contentType:string): string {
  const type = contentType.split('/').pop() || '';
  return type;
}

export function transparentBackground(mimetype: string, backgroundColor = 'white' as string) {
  return (bufferImage: Buffer) : Promise<Buffer> => {
    return new Promise((fulfill, reject) => {
      try {
        gm(bufferImage)
        .transparent(backgroundColor)
        .toBuffer(mimetype, (err, buffer) => {
          if (err) {
            console.log(err);
            reject(err);
          }
          console.log(buffer, 'buffer')
          fulfill(buffer);
        });
      } catch (err) {
        console.log(err);
        reject(err);
      }
    })
  }
}
