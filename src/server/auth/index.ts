import { Router } from "express";
import UserController from "../controllers/User.Controller";
const router = Router();

const userController = new UserController();

router.post('/signup', userController.create);
router.post('/signin', userController.signIn);

export default router;
