import mongoose from "mongoose";

const orderSchema = mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.Objectid, required: true, ref: "user" },
  orderItem: [
    {
        name: { type: String, required: true },
    Qty: { type: Number, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    product: {
      type: mongoose.Schema.Types.Objectid,
      required: true,
      ref: "product"},
    },
],
  shippingAdress: {
    address: { type: String, required: true },
    city: { type: String, required: true },
    postalcode: { type: String, required: true },
    country: { type: String, required: true },
  },
  paymentMethod: { type: String, required: true },
  paymentResult: {
    id: { type: String },
    status: { type: String },
    update_time:{type:String},
    emailAdress: { type: String },
    itemPrice: { type: Number, required: true, default: 0.0 },
    taxPrice: { type: Number, required: true, default: 0.0 },
    shippingPrice: { type: Number, required: true, default: 0.0 },
    totalPrice: { type: Number, required: true, default: 0.0 },
    isPaid: { type: Boolean, required: true, default: false },
    paidAt: { type: Date },
    isDelivered:{type:Boolean,required:true,default:false},
    deliveredAt:{type:Date},
  }
  },
 
{timeStamps:true}
);

const Order = mongoose.model("Order", orderschema);
export default Order
