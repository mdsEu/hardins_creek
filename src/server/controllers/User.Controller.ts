import UserRepository from "../repositories/User.Repository";
import { Request, Response } from "express";


class UserController {
  async create(req: Request, res: Response) {
    try {
      const userRepository = new UserRepository();
      userRepository.setEmail(req.body.email);
      userRepository.setPassword(req.body.password);

      const user = await userRepository.save();

      return res.json(user);
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
          return res.json(user);
        }
      }

      return res.json({ errorMessage: "Invalid email or password" });
    } catch (e) {
      return res.json({ errorMessage: "Error signing in" });
    }
  }
}

export default UserController;
