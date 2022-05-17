import aws from 'aws-sdk';
import config from '../config';

const S3Config = {
  accessKeyId: config.AWS_S3.AWS_ACCESS_KEY_ID,
  secretAccessKey: config.AWS_S3.AWS_SECRET_ACCESS_KEY,
  region: config.AWS_S3.AWS_S3_REGION,
}

class StoreAdapter {
  s3;
  bucket: string

  constructor(bucket:string) {
    this.s3 = new aws.S3(S3Config);
    this.bucket = bucket;
  }

  async saveFile(url:any) : Promise<string>{
    return "url";
  }

  removeFile(fileName: string) : Promise<boolean> {
    return new Promise(async (fulfill, reject) => {
      await this.s3.deleteObject(this.getBucketParams(fileName), (err) => {
        if (err) {
          reject(err)
        }

        fulfill(true)
      });
    })
  }

  private getBucketParams(fileName:string) : any {
    return {
      Bucket: this.bucket,
      Key: fileName
    };
  }
}

export default StoreAdapter;
