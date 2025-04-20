import mongoose, { Document, Model, Schema } from "mongoose";

export interface IProduct extends Document {
  name: string;
  price: number;
  quantity: number;
  storeName: string;
  image: string;
}

const productSchema = new Schema<IProduct>({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  storeName: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

const Product: Model<IProduct> =
  mongoose.models.Product || mongoose.model<IProduct>("Product", productSchema);

export default Product;
