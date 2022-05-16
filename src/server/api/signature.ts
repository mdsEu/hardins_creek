import SignatureController from "../controllers/Signature.Controller";
import upload from '../middlewares/multer';
import {validateImage} from '../middlewares/validator';
import { Router } from "express";

const mySignature = new SignatureController();

const router = Router();

router.post('/', upload.single('signature'), validateImage('signature'), mySignature.create)

module.exports = router;
