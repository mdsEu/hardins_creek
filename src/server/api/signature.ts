import SignatureController from "../controllers/Signature.Controller";
import upload from '../middlewares/uploadFile';
import {validateImage} from '../middlewares/validator';
import pagination from '../middlewares/pagination';
import { Router } from "express";

const mySignature = new SignatureController();

const router = Router();

router.post('/', upload('signature'), validateImage('signature'), mySignature.create);
router.get('/', pagination, pagination, mySignature.getAll);
router.get('/approved', pagination, mySignature.getAllApproved);

module.exports = router;
