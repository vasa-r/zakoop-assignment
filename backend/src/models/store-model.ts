import mongoose, { Document, Model, Schema } from "mongoose";

interface IStore extends Document {
  name: string;
  location: string;
  rating: number;
  image: string;
}

const storeSchema = new Schema<IStore>({
  name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

const Store: Model<IStore> =
  mongoose.models.Store || mongoose.model<IStore>("Store", storeSchema);

export default Store;
