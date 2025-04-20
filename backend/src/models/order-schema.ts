import mongoose, { Document, Model, Schema } from "mongoose";

interface IOrderProduct {
  name: string;
  price: number;
  quantity: number;
}

export interface IOrder extends Document {
  store: mongoose.Types.ObjectId;
  username: string;
  products: IOrderProduct[];
  totalPrice: number;
  createdAt: Date;
}

const orderProductSchema = new Schema<IOrderProduct>({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
});

const orderSchema = new Schema<IOrder>(
  {
    store: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Store",
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    products: [orderProductSchema],
    totalPrice: {
      type: Number,
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Order: Model<IOrder> =
  mongoose.models.Order || mongoose.model<IOrder>("Order", orderSchema);

export default Order;
