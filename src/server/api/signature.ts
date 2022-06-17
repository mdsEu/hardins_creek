import SignatureController from "../controllers/Signature.Controller";
import upload from '../middlewares/uploadFile';
import {validateImage} from '../middlewares/validator';
import pagination from '../middlewares/pagination';
import passport from "passport";
import { Router } from "express";

const mySignature = new SignatureController();

const router = Router();
const jwtOpts = {session: false};

router.post('/', upload('signature'), validateImage('signature'), mySignature.create);
router.patch('/:id', passport.authenticate('jwt', jwtOpts), mySignature.updateStatus);

router.get('/', passport.authenticate('jwt', jwtOpts), pagination, mySignature.getAll);
router.get('/approved', pagination, mySignature.getAllApproved);

module.exports = router;
