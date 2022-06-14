import UserRepository from "../repositories/User.Repository";
import { Request, Response } from "express";

import * as utils from "../utils";

import IUser from '../types/User';
class UserController {
  async create(req: Request, res: Response) {
    try {
      const userRepository = new UserRepository();
      userRepository.setEmail(req.body.email);
      userRepository.setPassword(req.body.password);

      const user = await userRepository.save();

      return res.json({...user, token: utils.auth.createToken(user as IUser)});
    } catch (e) {
      return res.json({
        errorMessage: "Error saving the user"
      });
    }
  }

  async signIn(req: Request, res: Response) {
    try {
      const userRepository = new UserRepository();
      const user = await userRepository.findByEmail(req.body.email);

      if (user) {
        if (await userRepository.validatePassword(req.body.password)) {
          return res.json({...user, token: utils.auth.createToken(user as IUser)});
        }
      }

      return res.json({ errorMessage: "Invalid email or password" });
    } catch (e) {
      return res.json({ errorMessage: "Error signing in" });
    }
  }

  async validate(req: Request, res: Response) {
    return res.json({
      user: req.user
    });
  }

}

export default UserController;
