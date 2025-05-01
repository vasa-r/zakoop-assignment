import mongoose, { Document, Model, Schema } from "mongoose";

export interface IOrderProduct {
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface IOrder extends Document {
  store: mongoose.Types.ObjectId;
  username: string;
  products: IOrderProduct[];
  totalPrice: number;
  isDelivered: boolean;
  expectedDeliveryDate: Date;
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
    isDelivered: {
      type: Boolean,
      default: false,
    },
    expectedDeliveryDate: {
      type: Date,
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

orderSchema.virtual("isDeliveredComputed").get(function (this: IOrder) {
  return (
    this.isDelivered ||
    (this.expectedDeliveryDate && new Date() >= this.expectedDeliveryDate)
  );
});

const Order: Model<IOrder> =
  mongoose.models.Order || mongoose.model<IOrder>("Order", orderSchema);

export default Order;
