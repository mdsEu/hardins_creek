// Dependencies
import {Document} from 'mongoose';

// User interface
interface IUser extends Document {
  email: string;
  password: string;
  comparePassword: (p:string) => Promise<boolean>;
}

export default IUser;
