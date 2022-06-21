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
      }).status(500);
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
      }).status(500);
    }
  }

  async getAll(req:Request, res: Response) {
    try {
      const signatureRepository = new SignatureRepository();
      //signatureRepository.setPagination(req.pagination);
      const signatures = await signatureRepository.findAll(req.pagination.queries);

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
      }).status(500);
    }
  }

  async updateStatus(req:Request, res: Response) {
    try {
      const signatureRepository = new SignatureRepository();
      await signatureRepository.setId(req.params.id);
      signatureRepository.setApproved(req.body.status === 'approved');
      const signature = await signatureRepository.updateStatus();

      return res.json(signature);
    } catch (e) {
      return res.json({
        errorMessage: "Error updating the signature"
      }).status(500);
    }
  }
}

export default SignatureController;
