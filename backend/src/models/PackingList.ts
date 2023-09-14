import mongoose, { Schema, Document } from 'mongoose';

export interface IPackingList extends Document {
  title: string;
  items: string[];
  user: Schema.Types.ObjectId;  // Reference to User
  createdAt: Date;
  updatedAt: Date;
}

const PackingListSchema: Schema = new Schema({
  title: {
    type: String,
    required: true
  },
  items: [{
    type: String,
    required: true
  }],
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',  // Reference to User model
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: Date
});

export default mongoose.model<IPackingList>('PackingList', PackingListSchema);
