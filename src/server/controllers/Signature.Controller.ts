import SignatureRepository from '../repositories/Signature.Repository';
import {Request, Response} from 'express';
import * as utils from '../utils';


class SignatureController {

  async create(req:Request, res: Response) {
    try {
      const file : any = req.file;
      const signatureRepository = new SignatureRepository();
      signatureRepository.setUrl(file.location);
      const signature = await signatureRepository.save();

      return res.json(signature);
    } catch (e) {
      return res.json({
        errorMessage: "Error saving the image"
      });
    }
  }

  async getAllApproved(req:Request, res: Response) {
    try {
      const searchingParameters : any = { approved: true };
      const signatureRepository = new SignatureRepository();
      signatureRepository.setPagination(req.pagination);
      const signatures = await signatureRepository.find(searchingParameters);

      return res.json(
          utils.parsePagination.default(
            signatures,
            req.pagination.page,
            req.pagination.limit
          )
        );
    } catch (e) {
      return res.json({
        errorMessage: "Error getting the signatures"
      });
    }
  }

  async getAll(req:Request, res: Response) {
    try {
      const signatureRepository = new SignatureRepository();
      signatureRepository.setPagination(req.pagination);
      const signatures = await signatureRepository.findAll();

      return res.json(
        utils.parsePagination.default(
          signatures,
          req.pagination.page,
          req.pagination.limit
        )
      );
    } catch (e) {
      return res.json({
        errorMessage: "Error getting the signatures"
      });
    }
  }
}

export default SignatureController;
