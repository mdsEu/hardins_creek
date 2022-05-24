import { String } from 'aws-sdk/clients/batch';
import {Request,  Response, NextFunction} from 'express';
import StoreAdapter from '../adapters/Store.Adapter';
import * as utils from '../utils'
import config from '../config';

const upload = (fileName: string) => {
  const storeAdapter = new StoreAdapter(config.AWS_S3.AWS_S3_BUCKET_NAME as String);

  return async (req:Request, res: Response, next: NextFunction) => {
    try {
      const files : any = req.files;
      const file = files[fileName];
      const newName = `${Date.now().toString()}_${file.name}`;
      //Pre-process to convert the image to a transparent background image
      const data : any = await utils.compose.asyncPipe(
        utils.image.transparentBackground(utils.image.getType(file.mimetype)),
        storeAdapter.saveFile(newName, file.mimetype)
      )(file.data)

      req.file = {
        ...file,
        fieldname: fileName,
        location: data.Location
      };
    } catch (e) {
      console.log(e);
      return res.json(e)
    }

    next();
  }
};


export default upload;
