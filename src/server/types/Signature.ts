import {Document} from 'mongoose';

export interface ISignature extends Document {
  url: string;
  approved: boolean;
  created_at: Date;
  updated_at: Date;
}
