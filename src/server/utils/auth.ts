import config from "../config";
import jwt from "jsonwebtoken";

import IUser from '../types/User';

const createToken = (user: IUser) => {
  return jwt.sign(
    {id: user._id, email: user.email},
    config.JWT_SECRET, {
      expiresIn: 60 * 60//20 minutes in seconds
    }
  );
};


export {
  createToken
}
