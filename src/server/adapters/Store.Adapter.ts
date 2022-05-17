import aws from 'aws-sdk';
import { blob } from 'aws-sdk/clients/codecommit';
import config from '../config';

const S3Config = {
  accessKeyId: config.AWS_S3.AWS_ACCESS_KEY_ID,
  secretAccessKey: config.AWS_S3.AWS_SECRET_ACCESS_KEY,
  region: config.AWS_S3.AWS_S3_REGION,
}

class StoreAdapter {
  s3;
  bucket: string;
  ACL =  'public-read';
  contentDisposition = 'inline';

  constructor(bucket:string) {
    this.s3 = new aws.S3(S3Config);
    this.bucket = bucket;
  }

  async saveFile(name:string, body: blob, contentType : string) : Promise<any>{
    const parameters = this.getBucketParams(name, body, contentType)
    const data = this.s3.upload(parameters).promise();

    return data
  }

  removeFile(fileName: string) : Promise<boolean> {
    return new Promise(async (fulfill, reject) => {
      this.s3.deleteObject(this.getBucketParams(fileName), (err) => {
        if (err) {
          reject(err)
        }

        fulfill(true)
      });
    })
  }

  setContentDisposition(contentDisposition : string) {
    this.contentDisposition = contentDisposition;
  }

  setACL(ACL:string) {
    this.ACL = ACL;
  }

  getContentDisposition() {
    return this.contentDisposition;
  }

  getACL() {
    return this.ACL;
  }

  private getBucketParams(fileName:string, body = undefined as  blob | undefined, contentType = undefined as string | undefined) : any {
    return {
      Bucket: this.bucket,
      Key: fileName,
      Body: body,
      ContentType: contentType,
      ACL: this.ACL,
      ContentDisposition: this.contentDisposition
    };
  }
}

export default StoreAdapter;
