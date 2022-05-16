import aws from 'aws-sdk';
import multer from 'multer';
import multerS3 from 'multer-s3';
import config from '../config';
import {NextFunction} from 'express';

const S3Config = {
  accessKeyId: config.AWS_S3.AWS_ACCESS_KEY_ID,
  secretAccessKey: config.AWS_S3.AWS_SECRET_ACCESS_KEY,
  region: config.AWS_S3.AWS_S3_REGION,
}
const s3 = new aws.S3(S3Config);

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'hardins-creek',
    acl: 'public-read',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    metadata: function (req: any, file: any, cb: any) {
      cb(null, {fieldName: file.fieldname});
    },
    key: function (req: any, file: any, cb: any) {
      cb(null, `${Date.now().toString()}.${file.mimetype.split('/').pop()}`)
    }
  })
});


export default upload;
