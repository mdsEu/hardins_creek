import UserController from "../controllers/User.Controller";
import passport from "passport";
import { Router } from "express";

const myUserController = new UserController();

const router = Router();
const jwtOpts = {session: false};

router.get('/validate', passport.authenticate('jwt', jwtOpts), myUserController.validate);

module.exports = router;
