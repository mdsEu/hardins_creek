// Dependencies
import { Strategy, ExtractJwt, StrategyOptions } from "passport-jwt";
import UserRepository from '../repositories/User.Repository';
import config from "../config";

// Strategy options to define how it gets user information
const opts: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.JWT_SECRET
};

// Strategy to get the user information through token
export default new Strategy(opts, async (payload, done) => {
  try {
    const userRepository = new UserRepository();
    const user = await userRepository.findById(payload.id);

    if (user) {
      return done(null, user);
    }

    return done(null, false);
  } catch (err) {
    console.log(err);
  }
});
