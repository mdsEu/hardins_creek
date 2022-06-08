// Dependencies
import {model, Schema} from 'mongoose';
import bcrypt from 'bcrypt';

// User interface
import IUser from '../types/User';

// User Schema
const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    index: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  }
});

// Encrypt method for user's password
userSchema.pre<IUser>('save', async function(next) {
  if (!this.isModified('password')) return next();

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(this.password, salt);

  this.password = hash;
  console.log(this.password)
  next();
});

// Decrypt method for user's password
userSchema.methods.comparePassword = async function(password:string): Promise<boolean> {
  console.log(this.password, password)
  return await bcrypt.compare(password, this.password);
};

export default model<IUser>('user', userSchema);
