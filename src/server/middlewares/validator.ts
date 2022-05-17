import {check, validationResult} from 'express-validator';
import {Request, Response, NextFunction} from 'express';
import StoreAdapter from '../adapters/Store.Adapter';

const BUCKET_NAME = 'hardins-creek';

const validateImage = (fieldname: string) => {

  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const file : any = req.file;
      const storeAdapter = new StoreAdapter(BUCKET_NAME);

      if (file.fieldname !== fieldname) {
        await storeAdapter.removeFile(file.key);

        return res.json({
          errorMessage: `${fieldname} was not sent`
        })
      }

      if (file.mimetype.split('/').pop() !== 'png') {
        await storeAdapter.removeFile(file.key);

        return res.json({
          errorMessage: `This image format  is not allowed, this should be .png`
        })
      }

      next();
    } catch (e) {
      return res.json({
        errorMessage: `Error sending the image`
      });
    }
  }
}

export {
  validateImage
};
