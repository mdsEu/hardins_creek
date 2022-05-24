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
            reject(err);
          }
          fulfill(buffer);
        });
      } catch (err) {
        reject(err);
      }
    })
  }
}
