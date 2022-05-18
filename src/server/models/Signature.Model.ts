// Dependencies
import {model, Schema} from 'mongoose';

//Type
import { ISignature } from '../types/Signature';

const userSchema = new Schema({
  url: {
    type: String,
    unique: true,
    required: true,
    index: true
  },
  approved: {
    type: Boolean,
    required: true,
    default: false
  },
  created_at: {
    type: Date,
    required: true,
    default: Date.now
  },
  updated_at: {
    type: Date,
    required: true,
    default: Date.now
  }
});

export default model<ISignature>('signature', userSchema);
