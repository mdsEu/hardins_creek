import SignatureRepository from '../repositories/Signature.Repository';
import {Request, Response} from 'express';


class SignatureController {

  async create(req:Request, res: Response) {
    try {
      const file : any = req.file;
      const signatureRepository = new SignatureRepository();
      signatureRepository.setUrl(file.location);
      const signature = await signatureRepository.save();

      return res.json(signature);
    } catch (e) {
      console.log(e)
      return res.json({
        errorMessage: "Error saving the image"
      });
    }
  }
}

export default SignatureController;
